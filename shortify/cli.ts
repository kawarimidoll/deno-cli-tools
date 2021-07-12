import { blue, bold, green, red } from "./deps.ts";
import { shortify } from "./mod.ts";

try {
  const url = Deno.args[0];
  const shortUrl = await shortify(url);

  console.log(blue(bold("Long URL:")), url);
  console.log(green(bold("Short URL:")), shortUrl);
} catch (error) {
  console.error(red(`Error: ${error}`));
}
