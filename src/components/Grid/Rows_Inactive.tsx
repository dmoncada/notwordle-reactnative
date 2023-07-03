import { observer } from "mobx-react-lite";
import { randomUUID as uuid } from "expo-crypto";
import { NUM_GUESSES, useStore } from "../../stores/RootStore";
import { Row } from "./GridStyles";
import Cell from "./Cell";

const InactiveRow = () => {
  return (
    <Row>
      <Cell letter="" state="unused" />
      <Cell letter="" state="unused" />
      <Cell letter="" state="unused" />
      <Cell letter="" state="unused" />
      <Cell letter="" state="unused" />
    </Row>
  );
};

const InactiveRows = observer(() => {
  const store = useStore();
  const numRows = NUM_GUESSES - store.previousGuesses.length - 1;
  const nullArray = Array(numRows).fill(null);

  return (
    <>
      {nullArray.map((_) => (
        <InactiveRow key={uuid()} />
      ))}
    </>
  );
});

export { InactiveRow, InactiveRows };
