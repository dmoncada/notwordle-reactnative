import { Asset } from "expo-asset";
import { Trie as Dawg } from "tiny-trie";
import { LetterState } from "./LetterState";

export type CountByLetter = { [letter: string]: number };
export type StateByLetter = { [letter: string]: LetterState };

export const ASCII_ALPHA: ReadonlyArray<string> = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
];

export const ASCII_UPPERCASE: ReadonlyArray<string> = ASCII_ALPHA.map(
  (letter) => letter.toUpperCase()
);

export const getWordListAsync = async (length: number): Promise<string[]> => {
  const module = require("../../assets/data/wordlist.txt");

  // Get the asset.
  const [asset] = await Asset.loadAsync(module);

  // Load the file.
  const file = await fetch(asset.localUri);

  // Get the content.
  const text = await file.text();

  // Make a list, keep only words of the given length.
  const words = text.split(/[\r\n]+/).filter((w) => w.length === length);

  return words;
};

export const createKeyboardState = (): StateByLetter =>
  ASCII_UPPERCASE.reduce((state: StateByLetter, letter: string) => {
    state[letter] = "unused";
    return state;
  }, {});

export const updateGuessState = (
  guess: string,
  target: string,
  guessStateRef: LetterState[][],
  guessHintsRef: number[][]
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

  guessStateRef.push(state);
  guessHintsRef.push(hints);
};

const getWeight = (state: LetterState) => {
  if (state === "correct") return 5;
  if (state === "inword") return 4;
  if (state === "wrong") return 3;
  if (state === "used") return 2;
  return 1;
};

export const updateKeyboardState = (
  guess: string,
  guessStateRef: LetterState[],
  keyboardStateRef: StateByLetter
): void => {
  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];
    const prevState = keyboardStateRef[letter];
    const nextState = guessStateRef[i];

    // Have we already seen this letter in a previous guess? If so,
    // make sure that the weight of its state increases monotonically.
    if (getWeight(nextState) > getWeight(prevState)) {
      keyboardStateRef[letter] = nextState;
    }
  }
};

export const pickRandomWordFromDawg = (graph: Dawg): string => {
  const builder: string[] = [];
  let node = graph.root;

  while (true) {
    if (node["\0"]) break;
    const labels = Object.keys(node);
    const randomLabel = labels[Math.floor(Math.random() * labels.length)];
    builder.push(randomLabel);
    node = node[randomLabel];
  }

  return builder.join("");
};
