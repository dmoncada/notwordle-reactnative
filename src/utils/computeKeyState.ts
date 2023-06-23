import { LetterState, ASCII_UPPERCASE } from "./constants";

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

const computeWeight = (status: LetterState) => {
  switch (status) {
    default:
    case "unused":
      return 1;
    case "used":
      return 2;
    case "wrong":
      return 3;
    case "inword":
      return 4;
    case "correct":
      return 5;
  }
};
