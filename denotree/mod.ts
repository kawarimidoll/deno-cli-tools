import { join } from "https://deno.land/std@0.100.0/path/mod.ts";

// ref: WalkEntry and WalkOptions
// in  https://deno.land/std@0.100.0/fs/mod.ts

export interface TreeEntry extends Deno.DirEntry {
  path: string;
}

export interface TreeOptions {
  maxDepth?: number;
  includeFiles?: boolean;
  followSymlinks?: boolean;
  exts?: string[];
  match?: RegExp[];
  skip?: RegExp[];
}

function include(
  path: string,
  exts?: string[],
  match?: RegExp[],
  skip?: RegExp[],
) {
  if (exts && !exts.some((ext) => path.endsWith(ext))) {
    return false;
  }
  if (match && !match.some((pattern) => !!path.match(pattern))) {
    return false;
  }
  if (skip && skip.some((pattern) => !!path.match(pattern))) {
    return false;
  }
  return true;
}

export async function denotree(
  root: string,
  prefix = "",
  {
    maxDepth = Infinity,
    includeFiles = true,
    followSymlinks = false,
    exts = undefined,
    match = undefined,
    skip = undefined,
  }: TreeOptions = {},
) {
  if (maxDepth < 1 || !include(root, undefined, undefined, skip)) {
    return;
  }

  const entries: TreeEntry[] = [];
  for await (const entry of Deno.readDir(root)) {
    if (entry.isFile && !includeFiles) {
      continue;
    }
    entries.push({ ...entry, path: join(root, entry.name) });
  }

  if (entries.length == 0) {
    return;
  }

  const sortedEntries = entries.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
  const lastOne = sortedEntries[entries.length - 1];

  for await (const entry of sortedEntries) {
    const branch = entry === lastOne ? "└── " : "├── ";

    const suffix = (entry.isDirectory) ? "/" : "";

    if (include(entry.path, exts, match, skip)) {
      console.log(prefix + branch + entry.name + suffix);
    }

    if (entry.isDirectory && entry.name !== ".git") {
      const indent = entry === lastOne ? "  " : "│  ";
      await denotree(entry.path, prefix + indent, {
        maxDepth: maxDepth - 1,
        includeFiles,
        followSymlinks,
        exts,
        match,
        skip,
      });
    }
  }
}
