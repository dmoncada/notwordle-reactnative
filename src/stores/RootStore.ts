import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { Alert } from "react-native";
import { Trie as Dawg } from "tiny-trie";
import { LetterState } from "../lib/LetterState";
import {
  StateByLetter,
  createKeyboardState,
  getWordListAsync,
  pickRandomWordFromDawg,
  updateGuessState,
  updateKeyboardState,
} from "../lib/utils";
import { SettingsStore } from "./SettingsStore";

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
  words: Dawg = null;

  constructor() {
    makeAutoObservable(this);

    // Instantiate and initialize the settings store.
    this.settings = new SettingsStore();

    // Instantiate the data structure for storing all words.
    this.words = new Dawg();
  }

  loadWordsAsync = async () => {
    const words = await getWordListAsync(NUM_LETTERS);
    words.forEach((word) => this.words.insert(word.toLocaleUpperCase()));
    this.words.freeze();
  };

  reset = () => {
    const target = pickRandomWordFromDawg(this.words);
    console.debug(target);

    this.target = target;
    this.currentGuess = "";
    this.previousGuesses = [];
    this.previousGuessesState = [];
    this.previousGuessesHints = [];
    this.keyboardState = createKeyboardState();
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
          onPress: () => this.reset(),
        },
      ]);

      return;
    }

    if (this.words.test(this.currentGuess) === false) {
      // Word invalid.
      Alert.alert("Invalid Word.");
      return;
    }

    if (this.previousGuesses.length === NUM_GUESSES - 1) {
      // Game over...
      Alert.alert("Game Over...", `The word was: ${this.target}`, [
        {
          text: "OK",
          style: "default",
          onPress: () => this.reset(),
        },
      ]);

      return;
    }

    // Store the last guess.
    this.previousGuesses.push(this.currentGuess);

    // Update the coloring and hint for each letter in the last guess.
    const [state, hints] = updateGuessState(this.currentGuess, this.target);
    this.previousGuessesState.push(state);
    this.previousGuessesHints.push(hints);

    // Update the state for each key that was included in the last guess.
    updateKeyboardState(this.currentGuess, state, this.keyboardState);

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

export { NUM_GUESSES, NUM_LETTERS, RootStore, RootStoreProvider, Screen, useStore };
