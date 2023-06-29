import { createContext, useContext } from "react";
import { makeAutoObservable, runInAction } from "mobx";
import { SettingsStore } from "./SettingsStore";
import { getWordFromList } from "../lib/utils";

type Screen = "game" | "help" | "settings";

class RootStore {
  target = "";
  numLetters = 5;
  numGuesses = 6;
  currentGuess = "";
  previousGuesses: string[] = [];
  settings: SettingsStore = null;
  screen: Screen = "game";

  constructor() {
    makeAutoObservable(this);
    this.settings = new SettingsStore();
  }

  resetAsync = async () => {
    const target = await getWordFromList(this.numLetters);

    runInAction(() => {
      this.target = target;
      this.currentGuess = "";
      this.previousGuesses = [];
    });
  };

  onKey = (keyPressed: string) => {
    if (this.currentGuess.length < this.numLetters) {
      this.currentGuess = this.currentGuess + keyPressed;
    }
  };

  onBack = () => {
    if (this.currentGuess.length > 0) {
      this.currentGuess = this.currentGuess.slice(0, -1);
    }
  };

  onEnter = () => {
    if (this.currentGuess.length < this.numLetters) {
      // Word too short.
      return;
    }

    if (this.previousGuesses.includes(this.currentGuess)) {
      // Already guessed.
      return;
    }

    if (this.currentGuess === this.target) {
      // Guessed the word!
      return;
    }

    // if (isValid(currentGuess) === false) {
    //   // Word invalid.
    //   // return;
    // }

    if (this.previousGuesses.length === this.numGuesses - 1) {
      // Game over...
      return;
    }

    this.previousGuesses.push(this.currentGuess);
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

export { Screen, RootStore, RootStoreProvider, useStore };
