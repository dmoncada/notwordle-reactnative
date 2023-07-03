import { observer } from "mobx-react-lite";
import { randomUUID as uuid } from "expo-crypto";
import { NUM_LETTERS, useStore } from "../../stores/RootStore";
import { Row } from "./GridStyles";
import Cell from "./Cell";
import { LetterState } from "../../lib/LetterState";

type Props = {
  word: string;
  state: LetterState[];
  hints?: number[];
};

const nullHints = Array(NUM_LETTERS).fill(null);

const CompletedRow = ({ word, state, hints }: Props) => {
  hints = hints || nullHints;

  return (
    <Row>
      <Cell letter={word[0]} state={state[0]} hint={hints[0]} />
      <Cell letter={word[1]} state={state[1]} hint={hints[1]} />
      <Cell letter={word[2]} state={state[2]} hint={hints[2]} />
      <Cell letter={word[3]} state={state[3]} hint={hints[3]} />
      <Cell letter={word[4]} state={state[4]} hint={hints[4]} />
    </Row>
  );
};

const CompletedRows = observer(() => {
  const store = useStore();
  const guesses = store.previousGuesses;
  const showHints = store.settings.showHints;
  const guessesState = store.previousGuessesState;
  const guessesHints = showHints ? store.previousGuessesHints : nullHints;

  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow key={uuid()} word={guess} state={guessesState[i]} hints={guessesHints[i]} />
      ))}
    </>
  );
});

export { CompletedRow, CompletedRows };
