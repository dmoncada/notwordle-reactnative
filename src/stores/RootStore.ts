import { createContext, useContext } from "react";
import { action, makeObservable, observable, runInAction } from "mobx";
import { getWordFromList } from "../lib/utils";

type Screen = "game" | "help" | "settings";

type Scheme = "light" | "dark" | "system";

class RootStore {
  target = "";
  numLetters = 5;
  numGuesses = 6;
  currentGuess = "";
  previousGuesses: string[] = [];
  screen: Screen = "game";
  scheme: Scheme = "light";
  isSwapped = false;

  constructor() {
    makeObservable(this, {
      // Observables.
      target: observable,
      numLetters: observable,
      numGuesses: observable,
      currentGuess: observable,
      previousGuesses: observable,
      screen: observable,
      scheme: observable,
      isSwapped: observable,

      // Actions.
      resetAsync: action,
      onKey: action,
      onBack: action,
      onEnter: action,
      changeScreen: action,
      changeScheme: action,
      swapButtons: action,
    });
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

  changeScheme = (nextScheme: Scheme) => {
    if (this.scheme !== nextScheme) {
      this.scheme = nextScheme;
    }
  };

  swapButtons = () => {
    this.isSwapped = !this.isSwapped;
  };
}

const RootStoreContext = createContext<RootStore>(null);
const RootStoreProvider = RootStoreContext.Provider;
const useStore = () => useContext(RootStoreContext);

export { Screen, Scheme, RootStore, RootStoreProvider, useStore };
