import { parse } from "./deps.ts";
import { denotree } from "./mod.ts";

try {
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
      .split("\n").filter((item) => item);

    ignoredList.forEach((str) => {
      skip.push(new RegExp(str.replace(".", "\\.")));
    });
  }

  await denotree(String(dir), {
    maxDepth: L,
    includeFiles: !d,
    followSymlinks: false,
    exts: undefined, // TODO: implement this
    match: undefined, // TODO: implement this
    skip,
  });
} catch (error) {
  console.error(`Error: ${error}`);
}
