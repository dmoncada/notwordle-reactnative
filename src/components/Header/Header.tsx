import { StyleSheet } from "react-native";
import { styled, useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../lib/colors";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px 10px;
  margin-bottom: 10px;
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
    active
      ? theme.secondaryActiveToggleBackground.toString()
      : theme.toggleBackground.toString()};
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.text.toString()};
`;

const Header = ({
  title,
  helpActive,
  settingsActive,
  onHelp,
  onSettings,
}: {
  title?: string;
  helpActive: boolean;
  settingsActive: boolean;
  onHelp: () => void;
  onSettings: () => void;
}) => {
  const theme = useTheme();
  const getColor = (active: boolean) => (active ? colors.green1 : theme.text);
  title = title || "Not Wordle";

  return (
    <Container>
      <GroupLeft style={{ flexGrow: 1 / 4 }}>
        <Pressable active={helpActive} onPress={onHelp}>
          <Feather name="help-circle" size={22} color={getColor(helpActive)} />
        </Pressable>
      </GroupLeft>

      <GroupMiddle style={{ flexGrow: 1 / 2 }}>
        <Title>{title}</Title>
      </GroupMiddle>

      <GroupRight style={{ flexGrow: 1 / 4 }}>
        <Pressable active={settingsActive} onPress={onSettings}>
          <Feather name="settings" size={22} color={getColor(settingsActive)} />
        </Pressable>
      </GroupRight>
    </Container>
  );
};

export default Header;
