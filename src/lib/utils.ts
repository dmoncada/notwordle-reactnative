import { Asset } from "expo-asset";
import { LetterState } from "./LetterState";

export type CountByLetter = { [letter: string]: number };
export type StateByLetter = { [letter: string]: LetterState };

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

export const getGuessState = (
  guess: string,
  target: string,
  stateRef: LetterState[][],
  hintsRef: number[][]
): void => {
  const state: LetterState[] = Array(guess.length).fill("wrong");
  const hints: number[] = Array(guess.length).fill(0);
  const unmatched: CountByLetter = {};

  target.split("").forEach((letter) => (unmatched[letter] = 0));

  for (let i = 0; i < guess.length; i++) {
    const g = guess[i];
    const t = target[i];
    if (g === t) {
      state[i] = "correct";
    } else {
      unmatched[t] += 1;
    }
  }

  for (let i = 0; i < guess.length; i++) {
    const g = guess[i];
    if (unmatched[g] && state[i] !== "correct") {
      state[i] = "inword";
      unmatched[g] -= 1;
    }
  }

  for (let i = 0; i < guess.length; i++) {
    const g = guess[i];
    if (unmatched[g]) {
      hints[i] = unmatched[g] + 1;
      unmatched[g] = 0;
    }
  }

  stateRef.push(state);
  hintsRef.push(hints);
};

const getWeight = (state: LetterState) => {
  if (state === "correct") return 5;
  if (state === "inword") return 4;
  if (state === "wrong") return 3;
  if (state === "used") return 2;
  return 1;
};

export const getKeyState = (
  letter: string,
  target: string,
  index: number
): LetterState => {
  if (letter === target[index]) return "correct";
  if (target.includes(letter)) return "inword";
  return "wrong";
};

export const getKeyboardState = (
  guesses: string[],
  target: string,
  stateRef: StateByLetter
): void => {
  ASCII_UPPERCASE.forEach((letter) => (stateRef[letter] = "unused"));

  for (const guess of guesses) {
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const prevState = stateRef[letter];
      const nextState = getKeyState(letter, target, i);

      // Have we already seen this letter in a previous guess? If so,
      // make sure that the weight of its state increases monotonically.
      if (getWeight(nextState) > getWeight(prevState)) {
        stateRef[letter] = nextState;
      }
    }
  }
};
