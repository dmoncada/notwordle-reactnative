import { ViewStyle } from "react-native";
import { styled } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { LetterState } from "../../utils/constants";

type Glyph = keyof typeof Ionicons.glyphMap;

const getBackgroundColor = (state: LetterState) => {
  switch (state) {
    default:
    case "unused":
      return "#dde1ec";
    case "wrong":
      return "#a6aec3";
    case "inword":
      return "#ebc450";
    case "correct":
      return "#85b65d";
  }
};

const getFontColor = (state: LetterState) => {
  switch (state) {
    default:
    case "unused":
    case "used":
      return "black";
    case "wrong":
    case "inword":
    case "correct":
      return "white";
  }
};

const Pressable = styled.Pressable<{ state: LetterState }>`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  border-radius: 3px;
  background-color: ${(props) => getBackgroundColor(props.state)};
`;

const Label = styled.Text<{ state: LetterState }>`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => getFontColor(props.state)};
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
  const handlePress = () => onPress(keyCode);

  return (
    <Pressable state={state} style={style} onPress={handlePress}>
      {icon ? (
        <Ionicons name={icon} size={24} />
      ) : (
        <Label state={state}>{keyCode}</Label>
      )}
    </Pressable>
  );
};

export default Key;
