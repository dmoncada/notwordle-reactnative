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
  flex-direction: row;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.toString()};
`;

const MainContainer = styled.View`
  flex: 1;
  max-width: 600px;
`;

const ScreenContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
`;

const Shell = () => {
  const store = useStore();
  const screen = store.screen;
  const scheme = store.settings.scheme;
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
        <MainContainer>
          <Header title="Not Wordle" />
          <ScreenContainer>{getScreen(screen)}</ScreenContainer>
        </MainContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default observer(Shell);
