// https://dev.to/soubai/build-cli-tool-with-deno-1me7

import ky from "https://cdn.skypack.dev/ky?dts";

import {
  blue,
  bold,
  green,
  red,
} from "https://deno.land/std@0.100.0/fmt/colors.ts";

async function shortify(url = ""): Promise<string> {
  // simple url validation
  new URL(url);

  const response: { result_url: string } = await ky.post(
    "https://cleanuri.com/api/v1/shorten",
    { json: { url } },
  ).json();

  return response.result_url;
}

try {
  const url = Deno.args[0];
  const shortUrl = await shortify(url);

  console.log(blue(bold("Long URL:")), url);
  console.log(green(bold("Short URL:")), shortUrl);
} catch (error) {
  console.log(red(`Error: ${error}`));
}
