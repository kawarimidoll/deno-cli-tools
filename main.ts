import { ansi } from "./deps.ts";

// console.log(ansi.cursorUp.cursorLeft.eraseDown());
// console.log(ansi.cursorUp(2).cursorLeft.eraseDown(2).toString());
// await Deno.stdout.write(ansi.cursorUp.cursorLeft.eraseDown.toBuffer());

const response = await fetch(
  "https://storage.googleapis.com/zenn-user-upload/avatar/2379ac8d86.jpeg",
);
const imageBuffer: ArrayBuffer = await response.arrayBuffer();

console.log(
  ansi.cursorTo(0, 0) +
    ansi.eraseDown() +
    ansi.image(imageBuffer, {
      width: 29,
      preserveAspectRatio: true,
    }) +
    "\n" +
    ansi.link("Deno Land", "https://deno.land") +
    "\n",
);
