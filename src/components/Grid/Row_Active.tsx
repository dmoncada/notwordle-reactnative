import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/RootStore";
import { Row } from "./GridStyles";
import Cell from "./Cell";

const ActiveRow = observer(() => {
  const store = useStore();
  const guess = store.currentGuess;

  const getLetter = (word: string, index: number) =>
    index < word.length ? word[index] : "";

  const getState = (word: string, index: number) =>
    index < word.length ? "used" : "unused";

  return (
    <>
      <Row>
        <Cell letter={getLetter(guess, 0)} state={getState(guess, 0)} />
        <Cell letter={getLetter(guess, 1)} state={getState(guess, 1)} />
        <Cell letter={getLetter(guess, 2)} state={getState(guess, 2)} />
        <Cell letter={getLetter(guess, 3)} state={getState(guess, 3)} />
        <Cell letter={getLetter(guess, 4)} state={getState(guess, 4)} />
      </Row>
    </>
  );
});

export { ActiveRow };
