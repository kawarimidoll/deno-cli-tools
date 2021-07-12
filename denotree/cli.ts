import { parse } from "https://deno.land/std@0.100.0/flags/mod.ts";
import { resolve } from "https://deno.land/std@0.100.0/path/mod.ts";
import { denotree } from "./mod.ts";

const {
  a,
  d,
  L,
  u,
  h,
  _: [dir = "."],
} = parse(Deno.args);

if (h) {
  const msg = `denotree
  'tree' powered by Deno

  USAGE
    denotree [dirname] : Show children of dirname. default dirname is pwd.

  OPTIONS
    a     : Show dotfiles
    d     : Show only directories
    u     : Show git ignored files
    L=num : Limit depth
    h     : Show this help message
  `;
  console.log(msg);
  Deno.exit(0);
}

const skip = [];
if (!a) {
  skip.push(/(^|\/)\./);
}
if (!u) {
  const process = Deno.run({
    cmd: ["git", "status", "--ignored", "-s"],
    stdout: "piped",
    stderr: "piped",
  });
  const outStr = new TextDecoder().decode(await process.output());
  process.close();
  const ignoredList = outStr.replace(/^[^!].+$/gm, "").replace(/^!! /mg, "")
    .split("\n").filter((item) => item).concat(".git");

  ignoredList.forEach((str) => {
    skip.push(new RegExp(str.replace(".", "\\.")));
  });
}

console.log(dir);
await denotree(resolve(Deno.cwd(), String(dir)), "", {
  maxDepth: L,
  includeFiles: !d,
  followSymlinks: false,
  exts: undefined,
  match: undefined,
  skip,
});
