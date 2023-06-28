import { randomUUID as uuid } from "expo-crypto";
import { LetterState } from "../../lib/LetterState";
import { Row } from "./GridStyles";
import Cell from "./Cell";

const getState = (
  target: string,
  letter: string,
  index: number
): LetterState => {
  if (letter === target[index]) return "correct";
  if (target.includes(letter)) return "inword";
  return "wrong";
};

const CompletedRows = ({
  target,
  guesses,
}: {
  target: string;
  guesses: string[];
}) => {
  return (
    <>
      {guesses.map((guess) => (
        <Row key={uuid()}>
          {Array.from(guess, (letter, i) => (
            <Cell
              key={uuid()}
              letter={letter}
              state={getState(target, letter, i)}
            />
          ))}
        </Row>
      ))}
    </>
  );
};

export default CompletedRows;
