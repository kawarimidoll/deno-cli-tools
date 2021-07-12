import ky from "https://cdn.skypack.dev/ky?dts";
import {
  blue,
  bold,
  green,
  red,
} from "https://deno.land/std@0.100.0/fmt/colors.ts";

async function getShortURL(url = ""): Promise<string> {
  // simple url validation
  new URL(url);

  const response: { result_url: string } = await ky.post(
    "https://cleanuri.com/api/v1/shorten",
    { json: { url } },
  ).json();

  return response.result_url;
}

export async function shortify(url = ""): Promise<void> {
  try {
    const shortUrl = await getShortURL(url);

    console.log(blue(bold("Long URL:")), url);
    console.log(green(bold("Short URL:")), shortUrl);
  } catch (error) {
    console.log(red(`Error: ${error}`));
  }
}
