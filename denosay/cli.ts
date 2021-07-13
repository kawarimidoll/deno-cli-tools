import {
  commandWithVersion,
  readLines,
  stringWidth,
  ValidationError,
} from "./deps.ts";
import { denosay, denoshout, denothink } from "./mod.ts";

try {
  const stdin = [];
  const isatty = Deno.isatty(Deno.stdin.rid);
  if (!isatty) {
    for await (const line of readLines(Deno.stdin)) {
      stdin.push(line);
    }
  }

  const { options, args } = await commandWithVersion.name("denosay")
    .description("Say your awesome text with ascii art.")
    .option("-t, --think", "Change balloon to rounded.")
    .option("-s, --shout", "Change balloon to spiky.", { conflicts: ["think"] })
    .option("-e, --eye <eye>", "Select the appearance of the deno's eyes.", {
      default: "･",
      value: (value: string): string => {
        if (stringWidth(value) !== 1) {
          throw new ValidationError(
            "Invalid eye parameter. This must be a single width character.",
            { exitCode: 1 },
          );
        }
        return value;
      },
    })
    .option("-r, --rain", "Make it rain.")
    .arguments("<text>")
    .parse(isatty ? Deno.args : [...Deno.args, stdin.slice(0, -1).join("\n")]);

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
