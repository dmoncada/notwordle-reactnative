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
    (active
      ? theme.secondaryActiveToggleBackground
      : theme.toggleBackground
    ).toString()};
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.text.toString()};
`;

const Icon = styled(Feather)<{ active?: boolean }>`
  color: ${({ theme, active }) =>
    (active ? colors.green1 : theme.text).toString()};
`;

const Header = ({ title }: { title: string }) => {
  const store = useStore();

  const changeScreen = (nextScreen: Screen) => {
    store.changeScreen(store.screen === nextScreen ? "game" : nextScreen);
  };

  const onHelp = () => changeScreen("help");
  const onSettings = () => changeScreen("settings");

  const helpActive = store.screen === "help";
  const settingsActive = store.screen === "settings";

  return (
    <Container>
      <GroupLeft style={{ flexGrow: 1 / 4 }}>
        <Pressable active={helpActive} onPress={onHelp}>
          <Icon name="help-circle" size={22} active={helpActive} />
        </Pressable>
      </GroupLeft>

      <GroupMiddle style={{ flexGrow: 1 / 2 }}>
        <Title>{title}</Title>
      </GroupMiddle>

      <GroupRight style={{ flexGrow: 1 / 4 }}>
        <Pressable active={settingsActive} onPress={onSettings}>
          <Icon name="settings" size={22} active={settingsActive} />
        </Pressable>
      </GroupRight>
    </Container>
  );
};

export default observer(Header);
