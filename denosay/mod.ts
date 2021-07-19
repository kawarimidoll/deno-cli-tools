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

function renderBalloon(text: string, delimiters: Delimiters) {
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
,   $T   ,   '  ,  '   , '
  '  $T  _     ,  '  ,
  ,    ( $Eヽ,   , ,    ,
,   ,  , \ \   ,     ,
   ,  '  ,⎞ \    ,  ,  '
 ,    ,   |  ｀ヽ ,    , '
'  ,   ,  ⎩      ﾄ､ ,   ,
     '   ' u¯u︶u     '
`;

// const AA = String.raw`
//     \
//      \  _
//        ( ･ヽ
//          \ \
//           ⎞ \
//           |  ｀ヽ
//           ⎩      ﾄ､
//            u¯u︶u
// `;

function renderAA(thoughts = " ", eye = "･", rain = false): string {
  if (stringWidth(eye) !== 1) {
    throw new Error(
      "Invalid eye parameter. This must be a single width character.",
    );
  }

  return (rain ? AA : AA.replaceAll(/,|'/g, " ")).replaceAll("$T", thoughts)
    .replace("$E", eye);
}

function render(
  text: string,
  delimiters: Delimiters,
  thoughts: string,
  options: DenosayOptions = {},
) {
  return renderBalloon(text, delimiters) +
    renderAA(thoughts, options.eye, options.rain);
}

export type DenosayOptions = {
  eye?: string;
  rain?: boolean;
};

export function denosay(text: string, options: DenosayOptions = {}) {
  const delimiters: Delimiters = {
    first: ["/", "\\"],
    middle: ["|", "|"],
    last: ["\\", "/"],
    only: ["<", ">"],
    vertical: ["_", "-"],
  };
  return render(text, delimiters, "\\", options);
}

export function denothink(text: string, options: DenosayOptions = {}) {
  const delimiters: Delimiters = {
    first: ["(", ")"],
    middle: ["(", ")"],
    last: ["(", ")"],
    only: ["(", ")"],
    vertical: ["◠", "◡"],
  };
  return render(text, delimiters, "o", options);
}

export function denoshout(text: string, options: DenosayOptions = {}) {
  const delimiters: Delimiters = {
    first: ["<", ">"],
    middle: ["<", ">"],
    last: ["<", ">"],
    only: ["<", ">"],
    vertical: ["^", "v"],
  };
  return render(text, delimiters, "\\", options);
}
