import { randomUUID } from "expo-crypto";
import { Row } from "./GridStyles";
import Cell from "./Cell";

const ActiveRow = ({
  numCells,
  guess,
}: {
  numCells: number;
  guess: string;
}) => {
  return (
    <>
      <Row>
        {Array.from(guess)
          .concat(Array(numCells - guess.length).fill(""))
          .map((letter) => (
            <Cell
              key={randomUUID()}
              letter={letter}
              state={letter ? "used" : "unused"}
            />
          ))}
      </Row>
    </>
  );
};

export default ActiveRow;
