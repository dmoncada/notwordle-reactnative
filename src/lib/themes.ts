import { Theme } from "./Theme";
import { colors } from "./colors";

const defaultTheme: Theme = {
  label: colors.black,
  inverseLabel: colors.white,

  background: colors.white,
  surface: colors.gray7,
  outline: colors.gray2,

  primary: colors.green5,
  onPrimary: colors.green2,

  secondary: colors.blue0,
  onSecondary: colors.blue0,

  key: {
    background: {
      unused: colors.gray7,
      used: colors.gray7,
      wrong: colors.gray5,
      inword: colors.yellow,
      correct: colors.green2,
    },
  },

  cell: {
    background: {
      unused: colors.gray9,
      used: colors.gray9,
      wrong: colors.gray5,
      inword: colors.yellow,
      correct: colors.green2,
    },
    border: {
      unused: colors.gray8,
      used: colors.gray6,
      wrong: colors.gray5,
      inword: colors.yellow,
      correct: colors.green2,
    },
  },
};

const darkTheme: Theme = {
  label: colors.gray9,
  inverseLabel: colors.gray9,

  background: colors.black,
  surface: colors.gray3,
  outline: colors.gray7,

  primary: colors.green0,
  onPrimary: colors.green2,

  secondary: colors.blue0,
  onSecondary: colors.blue0,

  key: {
    background: {
      unused: colors.gray3,
      used: colors.gray3,
      wrong: colors.gray1,
      inword: colors.yellow,
      correct: colors.green2,
    },
  },

  cell: {
    background: {
      unused: colors.gray0,
      used: colors.gray0,
      wrong: colors.gray1,
      inword: colors.yellow,
      correct: colors.green2,
    },
    border: {
      unused: colors.gray2,
      used: colors.gray4,
      wrong: colors.gray1,
      inword: colors.yellow,
      correct: colors.green2,
    },
  },
};

export { defaultTheme, darkTheme };
