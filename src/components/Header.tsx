import { useState } from "react";
import { StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { styled } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { Screen, useStore } from "../stores/RootStore";
import { colors } from "../lib/colors";

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
  background-color: ${({ theme, active }) =>
    (active ? theme.primary : theme.surface).toString()};
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.label.toString()};
`;

const Icon = styled(Feather)<{ active?: boolean }>`
  color: ${({ theme, active }) =>
    (active ? theme.onPrimary : theme.outline).toString()};
`;

const Header = ({ title }: { title: string }) => {
  const { screen, changeScreen } = useStore();
  const [helpHovered, setHelpHovered] = useState(false);
  const [settingsHovered, setSettingsHovered] = useState(false);

  const helpActive = helpHovered || screen === "help";
  const settingsActive = settingsHovered || screen === "settings";

  const toggleScreen = (nextScreen: Screen) => {
    changeScreen(screen === nextScreen ? "game" : nextScreen);
  };

  return (
    <Container>
      <GroupLeft style={{ flexGrow: 1 / 4 }}>
        <Pressable
          onHoverIn={() => setHelpHovered(true)}
          onHoverOut={() => setHelpHovered(false)}
          onPress={() => toggleScreen("help")}
          active={helpActive}
        >
          <Icon name="help-circle" size={22} active={helpActive} />
        </Pressable>
      </GroupLeft>

      <GroupMiddle style={{ flexGrow: 1 / 2 }}>
        <Title>{title}</Title>
      </GroupMiddle>

      <GroupRight style={{ flexGrow: 1 / 4 }}>
        <Pressable
          onHoverIn={() => setSettingsHovered(true)}
          onHoverOut={() => setSettingsHovered(false)}
          onPress={() => toggleScreen("settings")}
          active={settingsActive}
        >
          <Icon name="settings" size={22} active={settingsActive} />
        </Pressable>
      </GroupRight>
    </Container>
  );
};

export default observer(Header);
