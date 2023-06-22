import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { LetterState } from "../../utils/constants";

const getStyles = (state: LetterState): [ViewStyle, TextStyle] => {
  switch (state) {
    default:
    case "unused":
      return [cellStyles.unused, labelStyles.unused];
    case "used":
      return [cellStyles.used, labelStyles.used];
    case "wrong":
      return [cellStyles.wrong, labelStyles.wrong];
    case "inword":
      return [cellStyles.inword, labelStyles.inword];
    case "correct":
      return [cellStyles.correct, labelStyles.correct];
  }
};

const Cell = ({ letter, state }: { letter?: string; state?: LetterState }) => {
  const [cellStyle, labelStyle] = getStyles(state);

  return (
    <View style={[base.cell, cellStyle]}>
      <Text style={[base.cellLabel, labelStyle]}>{letter}</Text>
    </View>
  );
};

const base = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  cellLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const cellStyles = StyleSheet.create({
  unused: {
    borderColor: "#dfe1e9",
    backgroundColor: "#fbfcff",
  },
  used: {
    borderColor: "#a8adbe",
    backgroundColor: "#fbfcff",
  },
  wrong: {
    borderColor: "#a6aec3",
    backgroundColor: "#a6aec3",
  },
  inword: {
    borderColor: "#ebc450",
    backgroundColor: "#ebc450",
  },
  correct: {
    borderColor: "#85b65d",
    backgroundColor: "#85b65d",
  },
});

const labelStyles = StyleSheet.create({
  unused: {
    color: "black",
  },
  used: {
    color: "black",
  },
  wrong: {
    color: "white",
  },
  inword: {
    color: "white",
  },
  correct: {
    color: "white",
  },
});

export default Cell;
