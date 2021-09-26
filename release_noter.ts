// [gitのcommitで使用するプレフィックス](https://gist.github.com/otaon/13fdf5e035c968e240632bee7e952f46)
// [【Git】最新のタグ名を取得する方法 | White Space](https://www.white-space.work/get-latest-git-tag-name/)
// [Gitでブランチ（タグ）間のlogを確認する | Linux練習帳](http://php6.jp/linux/2011/08/07/git%E3%81%A7%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81%EF%BC%88%E3%82%BF%E3%82%B0%EF%BC%89%E9%96%93%E3%81%AElog%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B/)

import { groupBy } from "https://deno.land/std@0.108.0/collections/group_by.ts";
import { mapValues } from "https://deno.land/std@0.108.0/collections/map_values.ts";
import { sortBy } from "https://deno.land/std@0.108.0/collections/sort_by.ts";
import { open } from "https://deno.land/x/open@v0.0.2/index.ts";

async function runCommand(
  cmd: string[],
  { debug, trim }: Record<string, boolean> = {},
): Promise<[Deno.ProcessStatus, string, string]> {
  if (debug) {
    console.log(...cmd);
  }

  try {
    const p = Deno.run({ cmd, stdout: "piped", stderr: "piped" });
    const [status, output, stderrOutput] = await Promise.all(
      [p.status(), p.output(), p.stderrOutput()],
    );
    p.close();

    const decode = (input?: BufferSource) => {
      const str = new TextDecoder().decode(input);
      return trim ? str.trim() : str;
    };

    if (debug) {
      console.log({ status, output, stderrOutput });
    }
    return [status, decode(output), decode(stderrOutput)];
  } catch (error) {
    if (debug) {
      console.error(error);
    }
    return [{ success: false, code: 1 }, "", `${error}`];
  }
}

let cmd = ["git", "diff", "--name-status", "origin/HEAD", "HEAD"];
let [status, out, err] = await runCommand(cmd, { trim: true });
if (!status.success) {
  console.error(err);
  Deno.exit(status.code);
}
if (out) {
  console.error("There is diff between local and remote.");
  Deno.exit(1);
}

cmd = ["git", "describe", "--tags", "--abbrev=0"];
[status, out, err] = await runCommand(cmd, { trim: true });
if (!status.success) {
  console.error(err);
  Deno.exit(status.code);
}

const currentTag = out;
console.log("current latest tag:", currentTag);

// out = "0.1.0"; // for check
const prefixes = [
  "build",
  "feat",
  "fix",
  "ci",
  "docs",
  "style",
  "refactor",
  "revert",
  "perf",
  "test",
  "chore",
];

function pickFirst(str: string, regexp: RegExp) {
  return str.match(regexp)?.at(0) || "";
}

function prefixOf(str: string) {
  return pickFirst(str, /^\w+/);
}

function prefixOrderOf(str: string) {
  return prefixes.indexOf(prefixOf(str));
}

cmd = ["git", "log", `${out}..`, "--pretty=format:%s (%H)", "--no-merges"];
[status, out, err] = await runCommand(cmd, { trim: true });

if (!status.success) {
  console.error(err);
  Deno.exit(status.code);
}

const logs = out.split("\n")
  .reverse()
  .sort((a, b) => (prefixOrderOf(a)) - (prefixOrderOf(b)));
const output = Object.entries(mapValues(
  groupBy(logs, (msg) => prefixOf(msg)),
  (msgs) => sortBy(msgs, (msg) => pickFirst(msg, /^.+:/)),
)).map(([prefix, msgs]) =>
  [`**${prefix}**`, ...msgs.map((msg) => "- " + msg)].join("\n")
).join("\n\n");

console.log(output);

console.log();
if (!confirm("Create new draft release?")) {
  Deno.exit(0);
}

const title = prompt(
  "Input new tag (as release title)",
  currentTag.replace(/\d+$/, (p) => `${Number(p) + 1}`),
);

if (!title) {
  console.error("Tag is required");
  Deno.exit(1);
}

cmd = [
  "gh",
  "release",
  "create",
  title,
  "--draft",
  "--title",
  title,
  "--notes",
  output,
];
[status, out, err] = await runCommand(cmd, { trim: true });
if (!status.success) {
  console.error(err);
  Deno.exit(status.code);
}
console.log(out);

if (confirm("Open release page?")) {
  open(out);
}
