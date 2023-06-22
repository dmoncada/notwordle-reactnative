import { StyleSheet, View } from "react-native";
import { randomUUID } from "expo-crypto";
import { computeKeyStatus } from "../../utils/computeKeyStatus";
import Key from "./Key";

const Keyboard = ({
  target,
  guesses,
  onBack,
  onEnter,
  onKey,
}: {
  target: string;
  guesses: string[];
  onBack: () => void;
  onEnter: () => void;
  onKey: (arg: string) => void;
}) => {
  const stateMap = computeKeyStatus(target, guesses);

  return (
    <View style={styles.keyboard}>
      <View style={styles.keyRow}>
        {Array.from("QWERTYUIOP").map((keyCode) => (
          <Key
            key={randomUUID()}
            keyCode={keyCode}
            state={stateMap.get(keyCode)}
            onPress={onKey}
          />
        ))}
      </View>

      <View style={styles.keyRow}>
        {Array.from("ASDFGHJKL").map((keyCode) => (
          <Key
            key={randomUUID()}
            keyCode={keyCode}
            state={stateMap.get(keyCode)}
            onPress={onKey}
          />
        ))}
      </View>

      <View style={styles.keyRow}>
        <Key
          key={randomUUID()}
          keyCode={"BKSP"}
          onPress={(_) => onBack()}
          style={styles.metaKey}
        />

        {Array.from("ZXCVBNM").map((keyCode) => (
          <Key
            key={randomUUID()}
            keyCode={keyCode}
            state={stateMap.get(keyCode)}
            onPress={onKey}
          />
        ))}

        <Key
          key={randomUUID()}
          keyCode={"Enter"}
          onPress={(_) => onEnter()}
          style={styles.metaKey}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: "column",
    paddingHorizontal: 10,
    gap: 4,
  },
  keyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 35,
    gap: 4,
  },
  metaKey: {
    minWidth: 50,
  },
});

export default Keyboard;
