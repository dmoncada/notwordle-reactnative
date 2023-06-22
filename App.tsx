import { useState } from "react";
import { SafeAreaView } from "react-native";
import Keyboard from "./src/components/Keyboard/Keyboard";
import Grid from "./src/components/Grid/Grid";

const NUM_LETTERS: number = 5;
const NUM_GUESSES: number = 6;
const solution = "REACT";

export default function App() {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);

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
    if (currentGuess.length === NUM_LETTERS) {
      setPreviousGuesses(previousGuesses.concat([currentGuess]));
      setCurrentGuess("");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Grid
        numCells={NUM_LETTERS}
        numRows={NUM_GUESSES}
        target={solution}
        currectGuess={currentGuess}
        previousGuesses={previousGuesses}
      />

      <Keyboard
        target={solution}
        guesses={previousGuesses}
        onBack={onBack}
        onEnter={onEnter}
        onKey={onKey}
      />
    </SafeAreaView>
  );
}
