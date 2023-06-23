import { Theme } from "./Theme";
import { colors } from "./colors";

const defaultTheme: Theme = {
  background: colors.white,
  text: colors.black,
  textInverted: colors.white,
  key: {
    background: {
      unused: colors.gray7,
      used: colors.gray7,
      wrong: colors.gray5,
      inword: colors.yellow,
      correct: colors.green,
    },
  },
  cell: {
    background: {
      unused: colors.gray9,
      used: colors.gray9,
      wrong: colors.gray5,
      inword: colors.yellow,
      correct: colors.green,
    },
    border: {
      unused: colors.gray8,
      used: colors.gray6,
      wrong: colors.gray5,
      inword: colors.yellow,
      correct: colors.green,
    },
  },
};

const darkTheme: Theme = {
  background: colors.black,
  text: colors.white,
  textInverted: colors.white,
  key: {
    background: {
      unused: colors.gray3,
      used: colors.gray3,
      wrong: colors.gray1,
      inword: colors.yellow,
      correct: colors.green,
    },
  },
  cell: {
    background: {
      unused: colors.gray0,
      used: colors.gray0,
      wrong: colors.gray1,
      inword: colors.yellow,
      correct: colors.green,
    },
    border: {
      unused: colors.gray2,
      used: colors.gray4,
      wrong: colors.gray1,
      inword: colors.yellow,
      correct: colors.green,
    },
  },
};

export { defaultTheme, darkTheme };
