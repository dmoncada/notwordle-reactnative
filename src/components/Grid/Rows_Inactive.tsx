import { randomUUID } from "expo-crypto";
import { Row } from "./GridStyles";
import Cell from "./Cell";

const InactiveRows = ({
  numCells,
  numRows,
}: {
  numCells: number;
  numRows: number;
}) => {
  return (
    <>
      {Array(numRows)
        .fill("")
        .map((_) => (
          <Row key={randomUUID()}>
            {Array(numCells)
              .fill("")
              .map((_) => (
                <Cell key={randomUUID()} />
              ))}
          </Row>
        ))}
    </>
  );
};

export default InactiveRows;
