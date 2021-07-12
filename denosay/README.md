# denosay

Simple `cowsay` command implementation.

This is inspired from this project: https://github.com/piuccio/cowsay

## Required permissions

- none.

## Usage

### as CLI

```
$ deno install  --force https://github.com/kawarimidoll/deno-cli-tools/raw/main/denosay/cli.ts

$ denosay hello
```

### as Deno module

```ts
import { denosay } from "https://github.com/kawarimidoll/deno-cli-tools/raw/main/denosay/mod.ts";

await denosay("hello");
```
