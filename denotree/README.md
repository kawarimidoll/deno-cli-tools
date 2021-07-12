# denotree

Simple `tree` command implementation.

This automatically ignores `.git` directories and respects `.gitignore`.

## Usage

### as CLI

```
$ deno install --allow-net --force https://github.com/kawarimidoll/deno-cli-tools/raw/main/denotree/cli.ts

$ denotree
```

### as Deno module

```ts
import { denotree } from "https://github.com/kawarimidoll/deno-cli-tools/raw/main/denotree/mod.ts";

await denotree();
```
