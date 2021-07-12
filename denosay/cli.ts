import { parse } from "./deps.ts";
import * as denosay from "./mod.ts";

try {
  const {
    think,
    shout,
    _: [text],
  } = parse(Deno.args, { boolean: true });

  if (!text) {
    throw new Error("Input text is required");
  }

  const runner = think ? denosay.think : shout ? denosay.shout : denosay.say;
  console.log(runner(String(text)));
} catch (error) {
  console.error(`${error}`);
}
