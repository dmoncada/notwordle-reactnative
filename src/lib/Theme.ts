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
  label: ColorValue;
  inverseLabel: ColorValue;

  surface: ColorValue;
  outline: ColorValue;
  background: ColorValue;

  primary: ColorValue;
  onPrimary: ColorValue;

  secondary: ColorValue;
  onSecondary: ColorValue;

  key: KeyColor;
  cell: CellColor;
};

export { ColorByState, KeyColor, CellColor, Theme };
