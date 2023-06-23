import { Container } from "./GridStyles";
import ActiveRow from "./Row_Active";
import InactiveRows from "./Rows_Inactive";
import CompletedRows from "./Rows_Completed";

const Grid = ({
  numCells,
  numRows,
  target,
  currectGuess,
  previousGuesses,
}: {
  numCells: number;
  numRows: number;
  target: string;
  currectGuess: string;
  previousGuesses: string[];
}) => {
  const numInactiveRows = numRows - previousGuesses.length - 1;

  return (
    <Container>
      <CompletedRows target={target} guesses={previousGuesses} />
      <ActiveRow numCells={numCells} guess={currectGuess} />
      <InactiveRows numCells={numCells} numRows={numInactiveRows} />
    </Container>
  );
};

export default Grid;
