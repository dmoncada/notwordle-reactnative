import { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { ThemeProvider, styled } from "styled-components/native";
import { Asset } from "expo-asset";
import { defaultTheme, darkTheme } from "./src/lib/themes";
import Header from "./src/components/Header/Header";
import Grid from "./src/components/Grid/Grid";
import Keyboard from "./src/components/Keyboard/Keyboard";

type ActiveView = "game" | "settings" | "help";

const wordListFilePath = "./assets/data/wordlist.txt";

const NUM_LETTERS: number = 5;
const NUM_GUESSES: number = 6;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background.toString()};
`;

const Pressable = styled.Pressable`
  width: 120px;
  height: 40px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.key.background.unused.toString()};
  align-items: center;
  justify-content: center;
`;

const Label = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.text.toString()};
`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState("REACT");
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<ActiveView>("game");
  const [darkMode, setDarkMode] = useState(false);

  const getTargetWordFromList = async () => {
    try {
      // Get the asset.
      const [asset] = await Asset.loadAsync(require(wordListFilePath));

      // Load the file.
      const file = await fetch(asset.localUri);

      // Get the content.
      const text = await file.text();

      // Make a list, keep only words of the given length.
      const words = text.split("\n").filter((w) => w.length === NUM_LETTERS);

      // Get a random word from the list.
      const target = words[Math.floor(Math.random() * words.length)];

      // Set state.
      setSolution(target.toLocaleUpperCase());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (keyPressed: string) => {
    if (currentGuess.length < NUM_LETTERS) {
      setCurrentGuess(currentGuess + keyPressed);
    }
  };

  const onBack = () => {
    if (currentGuess.length > 0) {
      setCurrentGuess(currentGuess.slice(0, -1));
    }
  };

  const onEnter = () => {
    if (currentGuess.length < NUM_LETTERS) {
      // Word too short.
      return;
    }

    if (previousGuesses.includes(currentGuess)) {
      // Already guessed.
      return;
    }

    if (currentGuess === solution) {
      // Guessed the word!
      return;
    }

    // if (isValid(currentGuess) === false) {
    //   // Word invalid.
    //   // return;
    // }

    if (previousGuesses.length === NUM_GUESSES - 1) {
      // Game over...
      return;
    }

    setPreviousGuesses(previousGuesses.concat([currentGuess]));
    setCurrentGuess("");
  };

  const switchActiveView = (nextView: ActiveView) => {
    setActiveView(activeView === nextView ? "game" : nextView);
  };

  const reset = () => {
    getTargetWordFromList();
    setPreviousGuesses([]);
    setCurrentGuess("");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    getTargetWordFromList();
  }, []);

  if (loading) return <View />;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      <SafeAreaView>
        <Header
          helpActive={activeView === "help"}
          settingsActive={activeView === "settings"}
          onHelp={() => switchActiveView("help")}
          onSettings={() => switchActiveView("settings")}
        />

        <Grid
          numCells={NUM_LETTERS}
          numRows={NUM_GUESSES}
          target={solution}
          currectGuess={currentGuess}
          previousGuesses={previousGuesses}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 10,
          }}
        >
          <Pressable onPress={reset}>
            <Label>Reset</Label>
          </Pressable>

          <Pressable onPress={toggleTheme}>
            <Label>Toggle theme</Label>
          </Pressable>
        </View>

        <Keyboard
          target={solution}
          guesses={previousGuesses}
          onBack={onBack}
          onEnter={onEnter}
          onKey={onKey}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}
