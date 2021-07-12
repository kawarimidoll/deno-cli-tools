# shortify

Simple URL shortener.

This is inspired from this article:
https://dev.to/soubai/build-cli-tool-with-deno-1me7

## Usage

### as CLI

```
$ deno install --allow-net --force https://github.com/kawarimidoll/deno-cli-tools/raw/main/shortify/cli.ts

$ shortify https://github.com/
```

### as Deno module

```ts
import { shortify } from "./mod.ts";

await shortify("https://github.com/");
```
