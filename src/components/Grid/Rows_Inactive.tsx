import { randomUUID as uuid } from "expo-crypto";
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
          <Row key={uuid()}>
            {Array(numCells)
              .fill("")
              .map((_) => (
                <Cell key={uuid()} />
              ))}
          </Row>
        ))}
    </>
  );
};

export default InactiveRows;
