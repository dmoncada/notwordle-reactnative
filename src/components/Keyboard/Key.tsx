import { useState } from "react";
import { ViewStyle } from "react-native";
import { styled } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { LetterState } from "../../lib/LetterState";

type Glyph = keyof typeof Feather.glyphMap;

const Pressable = styled.Pressable<{
  hovered: boolean;
  pressed: boolean;
  letterState: LetterState;
}>`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  border-radius: 3px;
  background-color: ${({ theme, hovered, pressed, letterState }) => {
    // TODO: add colors to theme.
    //
    // light:
    // hover: c5cbdb
    // press: a1a8bd
    //
    // dark:
    // hover: 787b92
    // press: 65677e

    if (["used", "unused"].includes(letterState)) {
      if (pressed) return "#a1a8bd";
      if (hovered) return "#c5cbdb";
    }

    return theme.key.background[letterState].toString();
  }};
`;

const Icon = styled(Feather)`
  color: ${({ theme }) => theme.label.toString()};
`;

const Label = styled.Text<{ state: LetterState }>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme, state }) =>
    (["wrong", "inword", "correct"].includes(state)
      ? theme.inverseLabel
      : theme.label
    ).toString()};
`;

type Props = {
  keyCode: string;
  state: LetterState;
  onPress: (arg: string) => void;
  icon?: Glyph;
  style?: ViewStyle;
};

const Key = ({ keyCode, state, onPress, icon, style }: Props) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const handlePress = () => onPress(keyCode);

  return (
    <Pressable
      hovered={hovered}
      pressed={pressed}
      letterState={state}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={handlePress}
      style={style}
    >
      {icon ? (
        <Icon name={icon} size={24} />
      ) : (
        <Label state={state}>{keyCode}</Label>
      )}
    </Pressable>
  );
};

export default Key;
