import { makeAutoObservable, reaction, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Scheme = "light" | "dark";

type Settings = {
  scheme: Scheme;
  showHints: boolean;
  swapButtons: boolean;
};

const SETTINGS_KEY = "settings";

class SettingsStore {
  scheme: Scheme = "light";
  showHints = false;
  swapButtons = false;

  constructor() {
    makeAutoObservable(this);

    // Automatically save the settings to storage on change.
    reaction(() => this.toJson, this.saveAsync);

    // Load the settings from storage.
    this.loadSettingsAsync();
  }

  saveAsync = async (json: Settings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(json));
    } catch (error) {
      console.error(error);
    }
  };

  loadAsync = async (): Promise<Settings> => {
    try {
      const settings = await AsyncStorage.getItem(SETTINGS_KEY);
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  loadSettingsAsync = async () => {
    const settings = await this.loadAsync();
    if (settings !== null) {
      runInAction(() => {
        this.scheme = settings.scheme;
        this.showHints = settings.showHints;
        this.swapButtons = settings.swapButtons;
      });
    }
  };

  toggleScheme = () => {
    this.scheme = this.scheme === "dark" ? "light" : "dark";
  };

  toggleShowHints = () => {
    this.showHints = !this.showHints;
  };

  toggleSwapButtons = () => {
    this.swapButtons = !this.swapButtons;
  };

  get toJson(): Settings {
    return {
      scheme: this.scheme,
      showHints: this.showHints,
      swapButtons: this.swapButtons,
    };
  }
}

export { Scheme, SettingsStore };
