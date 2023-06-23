import { View } from "react-native";
import { randomUUID } from "expo-crypto";
import { LetterState } from "../../utils/constants";
import { gridStyles } from "./GridStyles";
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
        <View key={randomUUID()} style={gridStyles.row}>
          {Array.from(guess).map((letter, i) => (
            <Cell
              key={randomUUID()}
              letter={letter}
              state={getState(target, letter, i)}
            />
          ))}
        </View>
      ))}
    </>
  );
};

export default CompletedRows;
