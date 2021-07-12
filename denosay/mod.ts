import { stringWidth } from "./deps.ts";

// ref: https://github.com/piuccio/cowsay/blob/master/lib/balloon.js

type Delimiters = {
  first: [string, string];
  middle: [string, string];
  last: [string, string];
  only: [string, string];
  vertical: [string, string];
};

function surround(cover: [string, string], text: string, padding = " ") {
  return cover[0] + padding + text + padding + cover[1];
}

function formatBalloon(text: string, delimiters: Delimiters) {
  if (!text) {
    throw new Error("Input text is required");
  }
  const lines = text.split("\n");
  const maxLength = lines.reduce(
    (acc, current) => Math.max(stringWidth(current), acc),
    0,
  );
  const top = " " + delimiters.vertical[0].repeat(maxLength + 2);
  const bottom = " " + delimiters.vertical[1].repeat(maxLength + 2);

  const balloon = [top];
  if (lines.length == 1) {
    balloon.push(surround(delimiters.only, lines[0]));
  } else {
    for (let i = 0, len = lines.length; i < len; i++) {
      const delimiter = (i === 0)
        ? delimiters.first
        : (i === len - 1)
        ? delimiters.last
        : delimiters.middle;

      balloon.push(
        surround(
          delimiter,
          lines[i] + " ".repeat(maxLength - stringWidth(lines[i])),
        ),
      );
    }
  }
  balloon.push(bottom);

  return balloon.join("\n");
}

const AA = String.raw`
    $
     $  _
       ( ･ヽ
         \ \
          ⎞ \
          |  ｀ヽ
          ⎩      ﾄ､
           u¯u︶u
`;
// const deno = String.raw`
// ,      ,   ,   ,  ,
//  , ( ･ヽ  ,  ,   ,
//   ,  \ \   ,    ,  ,
//   ,   , ⎞ \    ,    ,
//   ,   |  ｀ヽ   ,  ,
//  ,  , ⎩      ﾄ､   ,
//        u¯u︶u
// `;

function render(text: string, thoughts: string, delimiters: Delimiters) {
  return formatBalloon(text, delimiters) + AA.replaceAll("$", thoughts);
}

export function say(text: string) {
  const delimiters: Delimiters = {
    first: ["/", "\\"],
    middle: ["|", "|"],
    last: ["\\", "/"],
    only: ["<", ">"],
    vertical: ["_", "-"],
  };
  return render(text, "\\", delimiters);
}

export function think(text: string) {
  const delimiters: Delimiters = {
    first: ["(", ")"],
    middle: ["(", ")"],
    last: ["(", ")"],
    only: ["(", ")"],
    vertical: ["◠", "◡"],
  };
  return render(text, "o", delimiters);
}

export function shout(text: string) {
  const delimiters: Delimiters = {
    first: ["<", ">"],
    middle: ["<", ">"],
    last: ["<", ">"],
    only: ["<", ">"],
    vertical: ["^", "v"],
  };
  return render(text, "o", delimiters);
}
