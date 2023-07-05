import { Alert, Platform } from "react-native";
import { createContext, useContext } from "react";
import { makeAutoObservable, runInAction } from "mobx";
import { SettingsStore } from "./SettingsStore";
import { LetterState } from "../lib/LetterState";
import {
  StateByLetter,
  getWordFromList,
  updateGuessState,
  updateKeyboardState,
  createKeyboardState,
} from "../lib/utils";

type Screen = "game" | "help" | "settings";

const NUM_LETTERS = 5;
const NUM_GUESSES = 6;

class RootStore {
  target = "";
  currentGuess = "";
  previousGuesses: string[] = [];
  previousGuessesState: LetterState[][] = [];
  previousGuessesHints: number[][] = [];
  keyboardState: StateByLetter = {};
  settings: SettingsStore = null;
  screen: Screen = "game";

  constructor() {
    makeAutoObservable(this);

    // Instantiate and initialize the settings store.
    this.settings = new SettingsStore();
  }

  resetAsync = async () => {
    const target = await getWordFromList(NUM_LETTERS);

    runInAction(() => {
      this.target = target;
      this.currentGuess = "";
      this.previousGuesses = [];
      this.previousGuessesState = [];
      this.previousGuessesHints = [];
      this.keyboardState = createKeyboardState();
    });
  };

  onKey = (keyPressed: string) => {
    if (this.currentGuess.length < NUM_LETTERS) {
      this.currentGuess = this.currentGuess + keyPressed;
    }
  };

  onBack = () => {
    if (this.currentGuess.length > 0) {
      this.currentGuess = this.currentGuess.slice(0, -1);
    }
  };

  onEnter = () => {
    if (this.currentGuess.length < NUM_LETTERS) {
      // Word too short.
      Alert.alert("Word Too Short.");
      return;
    }

    if (this.previousGuesses.includes(this.currentGuess)) {
      // Already guessed.
      Alert.alert("Already Guessed.");
      return;
    }

    if (this.currentGuess === this.target) {
      // Guessed the word!
      Alert.alert("You Guessed the Word!", `The word was: ${this.target}`, [
        {
          text: "OK",
          style: "default",
          onPress: () => this.resetAsync(),
        },
      ]);

      return;
    }

    // if (isValid(currentGuess) === false) {
    //   // Word invalid.
    //   // return;
    // }

    if (this.previousGuesses.length === NUM_GUESSES - 1) {
      // Game over...
      Alert.alert("Game Over...", `The word was: ${this.target}`, [
        {
          text: "OK",
          style: "default",
          onPress: () => this.resetAsync(),
        },
      ]);

      return;
    }

    // Store the last guess.
    this.previousGuesses.push(this.currentGuess);

    // Update the coloring and hint for each letter in the last guess.
    updateGuessState(this.currentGuess, this.target, this.previousGuessesState, this.previousGuessesHints);

    // Update the state for each key that was included in the last guess.
    updateKeyboardState(this.currentGuess, this.previousGuessesState.at(-1), this.keyboardState);

    // Clear the current guess.
    this.currentGuess = "";
  };

  changeScreen = (nextScreen: Screen) => {
    if (this.screen !== nextScreen) {
      this.screen = nextScreen;
    }
  };
}

const RootStoreContext = createContext<RootStore>(null);
const RootStoreProvider = RootStoreContext.Provider;
const useStore = () => useContext(RootStoreContext);

export {
  NUM_LETTERS,
  NUM_GUESSES,
  Screen,
  RootStore,
  RootStoreProvider,
  useStore,
};
