import { View } from "react-native";
import { randomUUID } from "expo-crypto";
import { gridStyles } from "./GridStyles";
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
      <View style={gridStyles.row}>
        {Array.from(guess)
          .concat(Array(numCells - guess.length).fill(""))
          .map((letter) => (
            <Cell
              key={randomUUID()}
              letter={letter}
              state={letter ? "used" : "unused"}
            />
          ))}
      </View>
    </>
  );
};

export default ActiveRow;
