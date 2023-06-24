import { Theme } from "./Theme";
import { colors } from "./colors";

const defaultTheme: Theme = {
  text: colors.black,
  textInverted: colors.white,

  background: colors.white,
  toggleBackground: colors.gray7,
  activeToggleBackground: colors.green1,
  secondaryActiveToggleBackground: colors.green2,

  key: {
    background: {
      unused: colors.gray7,
      used: colors.gray7,
      wrong: colors.gray5,
      inword: colors.yellow,
      correct: colors.green1,
    },
  },
  cell: {
    background: {
      unused: colors.gray9,
      used: colors.gray9,
      wrong: colors.gray5,
      inword: colors.yellow,
      correct: colors.green1,
    },
    border: {
      unused: colors.gray8,
      used: colors.gray6,
      wrong: colors.gray5,
      inword: colors.yellow,
      correct: colors.green1,
    },
  },
};

const darkTheme: Theme = {
  text: colors.white,
  textInverted: colors.white,

  background: colors.black,
  toggleBackground: colors.gray3,
  activeToggleBackground: colors.green1,
  secondaryActiveToggleBackground: colors.green0,

  key: {
    background: {
      unused: colors.gray3,
      used: colors.gray3,
      wrong: colors.gray1,
      inword: colors.yellow,
      correct: colors.green1,
    },
  },
  cell: {
    background: {
      unused: colors.gray0,
      used: colors.gray0,
      wrong: colors.gray1,
      inword: colors.yellow,
      correct: colors.green1,
    },
    border: {
      unused: colors.gray2,
      used: colors.gray4,
      wrong: colors.gray1,
      inword: colors.yellow,
      correct: colors.green1,
    },
  },
};

export { defaultTheme, darkTheme };
