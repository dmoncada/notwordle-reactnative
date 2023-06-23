import { ViewStyle } from "react-native";
import { styled, useTheme } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { LetterState } from "../../lib/LetterState";

type Glyph = keyof typeof Ionicons.glyphMap;

const Pressable = styled.Pressable<{ state: LetterState }>`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  border-radius: 3px;
  background-color: ${({ theme, state }) =>
    theme.key.background[state].toString()};
`;

const Label = styled.Text<{ state: LetterState }>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme, state }) =>
    ["wrong", "inword", "correct"].includes(state)
      ? theme.textInverted.toString()
      : theme.text.toString()};
`;

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
  const theme = useTheme();
  const handlePress = () => onPress(keyCode);

  state = state || "unused";

  return (
    <Pressable state={state} style={style} onPress={handlePress}>
      {icon ? (
        <Ionicons name={icon} size={24} color={theme.text} />
      ) : (
        <Label state={state}>{keyCode}</Label>
      )}
    </Pressable>
  );
};

export default Key;
