import { commandWithVersion } from "./deps.ts";
import { denosay, denoshout, denothink } from "./mod.ts";

try {
  const { options, args } = await commandWithVersion.name("denosay")
    .description("Say your awesome text with ascii art.")
    .option("-t, --think", "Change balloon to rounded.")
    .option("-s, --shout", "Change balloon to spiky.", { conflicts: ["think"] })
    .option("-e, --eye <eye>", "Select the appearance of the deno's eyes.", {
      default: "･",
    })
    .option("-r, --rain", "Make it rain.")
    .arguments("<text>")
    .parse(Deno.args);

  const {
    think,
    shout,
    eye,
    rain,
  } = options;

  const runner = think ? denothink : shout ? denoshout : denosay;
  console.log(runner(String(args[0]), { eye, rain }));
} catch (error) {
  console.error(`${error}`);
}
