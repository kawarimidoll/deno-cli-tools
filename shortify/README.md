# shortify

Simple URL shortener.

This is inspired from this article:
https://dev.to/soubai/build-cli-tool-with-deno-1me7

## Required permissions

- `--allow-net`: to access to `https://cleanuri.com/api/` to shorten URL.

## Usage

### as CLI

```
$ deno install --allow-net --force https://github.com/kawarimidoll/deno-cli-tools/raw/v0.1.1/shortify/cli.ts

$ shortify https://github.com/
```

`--reload` flag may be needed when updating.

### as Deno module

```ts
import { shortify } from "https://github.com/kawarimidoll/deno-cli-tools/raw/v0.1.1/shortify/mod.ts";

await shortify("https://github.com/");
```
