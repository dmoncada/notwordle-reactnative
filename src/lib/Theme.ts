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
  text: ColorValue;
  textInverted: ColorValue;

  background: ColorValue;
  toggleBackground: ColorValue;
  activeToggleBackground: ColorValue;
  secondaryActiveToggleBackground: ColorValue;

  key: KeyColor;
  cell: CellColor;
};

export { ColorByState, KeyColor, CellColor, Theme };
