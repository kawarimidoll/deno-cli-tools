export {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.100.0/testing/asserts.ts";

import {
  Command,
  ValidationError,
} from "https://deno.land/x/cliffy@v0.19.2/command/mod.ts";

import { version } from "./version.ts";
const commandWithVersion = new Command().version(version);

export { Command, commandWithVersion, ValidationError };
