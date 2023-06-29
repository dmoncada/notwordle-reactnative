import { Asset } from "expo-asset";
import { LetterState } from "./LetterState";

export const ASCII_ALPHA: ReadonlyArray<string> = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
];

export const ASCII_UPPERCASE: ReadonlyArray<string> = ASCII_ALPHA.map(
  (letter) => letter.toUpperCase()
);

export const getWordFromList = async (length: number): Promise<string> => {
  const FILE_PATH = "../../assets/data/wordlist.txt";

  // Get the asset.
  const [asset] = await Asset.loadAsync(require(FILE_PATH));

  // Load the file.
  const file = await fetch(asset.localUri);

  // Get the content.
  const text = await file.text();

  // Make a list, keep only words of the given length.
  const words = text.split("\n").filter((w) => w.length === length);

  // Get a random word from the list.
  const word = words[Math.floor(Math.random() * words.length)];

  // Convert to upper, return.
  return word.toLocaleUpperCase();
};

const getWeight = (status: LetterState) => {
  switch (status) {
    default:
    case "unused": return 1;
    case "used": return 2;
    case "wrong": return 3;
    case "inword": return 4;
    case "correct": return 5;
  }
};

export const getLetterState = (
  letter: string,
  target: string,
  index: number
): LetterState => {
  if (letter === target[index]) return "correct";
  if (target.includes(letter)) return "inword";
  return "wrong";
}

export const computeKeyState = (target: string, guesses: string[]) => {
  const stateMap: { [letter: string]: LetterState } = {};
  ASCII_UPPERCASE.forEach((letter) => (stateMap[letter] = "unused"));

  for (const guess of guesses) {
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const prevState = stateMap[letter];
      const nextState = getLetterState(letter, target, i);

      // Have we already seen this letter in a previous guess? If so,
      // make sure that the weight of its state increases monotonically.
      if (getWeight(nextState) > getWeight(prevState)) {
        stateMap[letter] = nextState;
      }
    }
  }

  return stateMap;
};
