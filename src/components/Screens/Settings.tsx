import { StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { styled } from "styled-components/native";
import { useStore } from "../../stores/RootStore";

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  align-items: center;
  padding: 5px 0;
  border-radius: 6px;
  background-color: lightblue;
`;

const Heading = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.text.toString()};
`;

const Description = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: gray;
`;

const ScrollView = styled.ScrollView`
  margin: 10px;
`;

const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  border-top-color: lightgray;
  border-top-width: ${() => StyleSheet.hairlineWidth}px;
`;

const TextContainer = styled.View`
  max-width: 80%;
`;

const Toggle = styled.Switch`
  align-self: flex-end;
`;

const Settings = () => {
  const { scheme, isSwapped, changeScheme, swapButtons } = useStore();

  const toggleScheme = () => {
    changeScheme(scheme === "dark" ? "light" : "dark");
  };

  return (
    <Container>
      <Header>
        <Heading>Settings</Heading>
      </Header>
      <ScrollView>
        <Item>
          <TextContainer>
            <Heading>Dark Mode</Heading>
            <Description>Change dark and light mode</Description>
          </TextContainer>
          <Toggle value={scheme === "dark"} onChange={toggleScheme} />
        </Item>
        <Item>
          <TextContainer>
            <Heading>Letter hints</Heading>
            <Description>
              Hint above the letter that it appears twice or more in the hidden
              word
            </Description>
          </TextContainer>
          <Toggle />
        </Item>
        <Item>
          <TextContainer>
            <Heading>Swap Butons</Heading>
            <Description>Swap "Enter" and "Backspace" buttons</Description>
          </TextContainer>
          <Toggle value={isSwapped} onChange={swapButtons} />
        </Item>
      </ScrollView>
    </Container>
  );
};

export default observer(Settings);
