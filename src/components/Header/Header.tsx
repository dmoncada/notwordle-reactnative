import { StyleSheet } from "react-native";
import { styled } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../lib/colors";

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

const Header = ({
  title,
  helpActive,
  settingsActive,
  onHelp,
  onSettings,
}: {
  title: string;
  helpActive: boolean;
  settingsActive: boolean;
  onHelp: () => void;
  onSettings: () => void;
}) => {
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

export default Header;
