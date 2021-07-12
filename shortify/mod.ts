import { ky } from "./deps.ts";

export async function shortify(url = ""): Promise<string> {
  // simple url validation
  new URL(url);

  const response: { result_url: string } = await ky.post(
    "https://cleanuri.com/api/v1/shorten",
    { json: { url } },
  ).json();

  return response.result_url;
}
