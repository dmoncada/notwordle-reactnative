import { Asset } from "expo-asset";
import { LetterState } from "./LetterState";

export const ASCII_ALPHA: ReadonlyArray<string> = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
];

export const ASCII_UPPERCASE: ReadonlyArray<string> = ASCII_ALPHA.map(
  (letter) => letter.toUpperCase()
);

export const getWordFromList = async (
  filePath: string,
  length: number
): Promise<string> => {
  // Get the asset.
  const [asset] = await Asset.loadAsync(require(filePath));

  // Load the file.
  const file = await fetch(asset.localUri);

  // Get the content.
  const text = await file.text();

  // Make a list, keep only words of the given length.
  const words = text.split("\n").filter((w) => w.length === length);

  // Get a random word from the list.
  const target = words[Math.floor(Math.random() * words.length)];

  // Convert to upper, return.
  return target.toLocaleUpperCase();
};

const computeWeight = (status: LetterState) => {
  switch (status) {
    default:
    case "unused": return 1;
    case "used": return 2;
    case "wrong": return 3;
    case "inword": return 4;
    case "correct": return 5;
  }
};

export const computeKeyState = (target: string, guesses: string[]) => {
  const stateMap = new Map<string, LetterState>(
    ASCII_UPPERCASE.map((letter) => [letter, "unused"])
  );

  for (const guess of guesses) {
    for (let i = 0; i < guess.length; i++) {
      const correct = target[i];
      const letter = guess[i];

      let prevState = stateMap.get(letter);
      let nextState: LetterState;

      if (letter === correct) {
        nextState = "correct";
      } else if (target.includes(letter)) {
        nextState = "inword";
      } else {
        nextState = "wrong";
      }

      // Have we already seen this letter in a previous guess? If so,
      // make sure that the weight of its state increases monotonically.
      if (computeWeight(nextState) > computeWeight(prevState)) {
        stateMap.set(letter, nextState);
      }
    }
  }

  return stateMap;
};
