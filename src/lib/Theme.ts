import { ColorValue } from "react-native";
import { LetterState } from "./LetterState";

type ColorByState = Record<LetterState, ColorValue>;

type KeyColor = {
  background: ColorByState;
};

type CellColor = {
  border: ColorByState;
  background: ColorByState;
};

type Theme = {
  background: ColorValue;
  text: ColorValue;
  textInverted: ColorValue;
  key: KeyColor;
  cell: CellColor;
};

export { ColorByState, KeyColor, CellColor, Theme };
