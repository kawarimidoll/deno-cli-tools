// https://dev.to/soubai/build-cli-tool-with-deno-1me7

import { shortify } from "./mod.ts";

await shortify(Deno.args[0]);
