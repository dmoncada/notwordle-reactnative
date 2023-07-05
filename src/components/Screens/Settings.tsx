import { ListRenderItemInfo, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { randomUUID as uuid } from "expo-crypto";
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
  color: ${({ theme }) => theme.label.toString()};
`;

const Description = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: gray;
`;

const FlatList = styled.FlatList`
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

type ItemProps = {
  id: string;
  heading: string;
  description: string;
  value: boolean;
  onChange: () => void;
};

const renderItem = ({ item }: ListRenderItemInfo<ItemProps>) => (
  <Item>
    <TextContainer>
      <Heading>{item.heading}</Heading>
      <Description>{item.description}</Description>
    </TextContainer>
    <Toggle value={item.value} onValueChange={item.onChange} />
  </Item>
);

const Settings = () => {
  const {
    settings: {
      scheme,
      showHints,
      swapButtons,
      toggleScheme,
      toggleShowHints,
      toggleSwapButtons,
    },
  } = useStore();

  const data: ItemProps[] = [
    {
      id: uuid(),
      heading: "Dark Mode",
      description: "Change dark and light mode",
      value: scheme === "dark",
      onChange: toggleScheme,
    },
    {
      id: uuid(),
      heading: "Letter Hints",
      description: "Hint above the letter that it appears twice or more in the hidden word",
      value: showHints,
      onChange: toggleShowHints,
    },
    {
      id: uuid(),
      heading: "Swap Buttons",
      description: 'Swap "Enter" and "Backspace" buttons',
      value: swapButtons,
      onChange: toggleSwapButtons,
    },
  ];

  return (
    <Container>
      <Header>
        <Heading>Settings</Heading>
      </Header>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: ItemProps) => item.id}
      />
    </Container>
  );
};

export default observer(Settings);
