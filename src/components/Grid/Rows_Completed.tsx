import { randomUUID as uuid } from "expo-crypto";
import { getLetterState } from "../../lib/utils";
import { Row } from "./GridStyles";
import Cell from "./Cell";

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
              state={getLetterState(letter, target, i)}
            />
          ))}
        </Row>
      ))}
    </>
  );
};

export default CompletedRows;
