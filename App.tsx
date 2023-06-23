import { useState } from "react";
import { View } from "react-native";
import { ThemeProvider, styled } from "styled-components/native";
import { defaultTheme, darkTheme } from "./src/lib/themes";
import Keyboard from "./src/components/Keyboard/Keyboard";
import Grid from "./src/components/Grid/Grid";

const NUM_LETTERS: number = 5;
const NUM_GUESSES: number = 6;
const solution = "REACT";

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
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

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

  const reset = () => {
    setPreviousGuesses([]);
    setCurrentGuess("");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      <SafeAreaView>
        <View style={{ height: "65%" }}>
          <Grid
            numCells={NUM_LETTERS}
            numRows={NUM_GUESSES}
            target={solution}
            currectGuess={currentGuess}
            previousGuesses={previousGuesses}
          />
        </View>

        <View
          style={{
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-evenly",
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
