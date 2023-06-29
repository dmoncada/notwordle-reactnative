import { StatusBar } from "react-native";
import { observer } from "mobx-react-lite";
import { ThemeProvider, styled } from "styled-components/native";
import { Screen, useStore } from "../stores/RootStore";
import Header from "./Header";
import Game from "./Screens/Game";
import Help from "./Screens/Help";
import Settings from "./Screens/Settings";
import { darkTheme, defaultTheme } from "../lib/themes";

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background.toString()};
`;

const ScreenContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
`;

const Shell = () => {
  const { screen, scheme } = useStore();
  const darkMode = scheme === "dark";

  const getScreen = (screen: Screen) => {
    switch (screen) {
      default:
      case "game":
        return <Game />;
      case "help":
        return <Help />;
      case "settings":
        return <Settings />;
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      <SafeAreaView>
        <Header title="Not Wordle" />
        <ScreenContainer>{getScreen(screen)}</ScreenContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default observer(Shell);
