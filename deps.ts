export {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.101.0/testing/asserts.ts";

import {
  Command,
  ValidationError,
} from "https://deno.land/x/cliffy@v0.19.3/command/mod.ts";

import { version } from "./version.ts";
const commandWithVersion = new Command().version(version);

export { Command, commandWithVersion, ValidationError };
