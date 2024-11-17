import { useState } from "react";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { styled } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { Screen, useStore } from "../stores/RootStore";
import { colors } from "../lib/colors";

type Glyph = keyof typeof Feather.glyphMap;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px 10px;
  border-bottom-color: ${() => colors.gray8.toString()};
  border-bottom-width: ${() => `${StyleSheet.hairlineWidth}px`};
`;

const GroupLeft = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5px;
`;

const GroupMiddle = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const GroupRight = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  gap: 5px;
`;

const Pressable = styled.Pressable<{ active: boolean }>`
  width: 35px;
  height: 35px;
  border-radius: 8px;
  background-color: ${({ theme, active }) => (active ? theme.primary : theme.surface).toString()};
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.label.toString()};
`;

const Icon = styled(Feather)<{ active?: boolean }>`
  color: ${({ theme, active }) => (active ? theme.onPrimary : theme.outline).toString()};
`;

const IconButton = (props: { iconName: Glyph; selected: boolean; onPress: () => void }) => {
  const { iconName, selected, onPress } = props;
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      active={selected || hovered}
      onPress={onPress}
    >
      <Icon name={iconName} size={22} active={selected || hovered} />
    </Pressable>
  );
};

const Header = ({ title }: { title: string }) => {
  const { screen, changeScreen } = useStore();

  const toggleScreen = (nextScreen: Screen) => {
    changeScreen(screen === nextScreen ? "game" : nextScreen);
  };

  return (
    <Container>
      <GroupLeft style={{ flexGrow: 1 / 4 }}>
        <IconButton iconName="help-circle" selected={screen === "help"} onPress={() => toggleScreen("help")} />
      </GroupLeft>

      <GroupMiddle style={{ flexGrow: 1 / 2 }}>
        <Title>{title}</Title>
      </GroupMiddle>

      <GroupRight style={{ flexGrow: 1 / 4 }}>
        <IconButton iconName="settings" selected={screen === "settings"} onPress={() => toggleScreen("settings")} />
      </GroupRight>
    </Container>
  );
};

export default observer(Header);
