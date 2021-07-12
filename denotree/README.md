# denotree

Simple `tree` command implementation.

This automatically ignores `.git` directories and respects `.gitignore`.

## Required permissions

- `--allow-read`: to use `Deno.cwd()` to get current directory.
- `--allow-run`: to use `Deno.run()` to find git-ignored files.

## Usage

### as CLI

```
$ deno install --allow-read --allow-run --force https://github.com/kawarimidoll/deno-cli-tools/raw/main/denotree/cli.ts

$ denotree
```

### as Deno module

```ts
import { denotree } from "https://github.com/kawarimidoll/deno-cli-tools/raw/main/denotree/mod.ts";

await denotree();
```
