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
    reaction(() => this.toJson, this.save);
    this.load();
  }

  load = async () => {
    try {
      const settings = await AsyncStorage.getItem(SETTINGS_KEY);

      if (settings !== null) {
        const { scheme, showHints, swapButtons }: Settings =
          JSON.parse(settings);

        runInAction(() => {
          this.scheme = scheme;
          this.showHints = showHints;
          this.swapButtons = swapButtons;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  save = async (json: Settings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(json));
    } catch (error) {
      console.error(error);
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
