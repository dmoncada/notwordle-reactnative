import { View } from "react-native";
import { randomUUID } from "expo-crypto";
import { gridStyles } from "./GridStyles";
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
          <View key={randomUUID()} style={gridStyles.row}>
            {Array(numCells)
              .fill("")
              .map((_) => (
                <Cell key={randomUUID()} />
              ))}
          </View>
        ))}
    </>
  );
};

export default InactiveRows;
