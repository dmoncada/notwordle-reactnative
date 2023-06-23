import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LetterState } from "../../utils/constants";

type Glyph = keyof typeof Ionicons.glyphMap;

const getStyles = (state: LetterState): [ViewStyle, TextStyle] => {
  switch (state) {
    default:
    case "unused":
      return [keyStyles.unused, labelStyles.unused];
    case "wrong":
      return [keyStyles.wrong, labelStyles.wrong];
    case "inword":
      return [keyStyles.inword, labelStyles.inword];
    case "correct":
      return [keyStyles.correct, labelStyles.correct];
  }
};

const Key = ({
  keyCode,
  onPress,
  icon,
  state,
  style,
}: {
  keyCode: string;
  onPress: (arg: string) => void;
  icon?: Glyph;
  state?: LetterState;
  style?: ViewStyle;
}) => {
  const [keyStyle, labelStyle] = getStyles(state);
  const handlePress = () => onPress(keyCode);

  return (
    <Pressable style={[base.key, keyStyle, style]} onPress={handlePress}>
      {icon ? (
        <Ionicons name={icon} size={24} />
      ) : (
        <Text style={[base.keyLabel, labelStyle]}>{keyCode}</Text>
      )}
    </Pressable>
  );
};

const base = StyleSheet.create({
  key: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 20,
    borderRadius: 3,
  },
  keyLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

const keyStyles = StyleSheet.create({
  unused: {
    backgroundColor: "#dde1ec",
  },
  wrong: {
    backgroundColor: "#a6aec3",
  },
  inword: {
    backgroundColor: "#ebc450",
  },
  correct: {
    backgroundColor: "#85b65d",
  },
});

const labelStyles = StyleSheet.create({
  correct: {
    color: "white",
  },
  inword: {
    color: "white",
  },
  wrong: {
    color: "white",
  },
  unused: {
    color: "black",
  },
});

export default Key;
