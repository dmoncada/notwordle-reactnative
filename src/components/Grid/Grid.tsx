import { Container } from "./GridStyles";
import { ActiveRow } from "./Row_Active";
import { InactiveRows } from "./Rows_Inactive";
import { CompletedRows } from "./Rows_Completed";

const Grid = () => {
  return (
    <Container>
      <CompletedRows />
      <ActiveRow />
      <InactiveRows />
    </Container>
  );
};

export default Grid;
