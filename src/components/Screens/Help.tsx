import styled from "styled-components/native";
import { LetterState as State } from "../../lib/LetterState";
import { CompletedRow } from "../Grid/Rows_Completed";

const target = "FLAME";
const guess1 = "TABLE";
const guess2 = "FLASH";
const state1: State[] = ["wrong", "inword", "wrong", "inword", "correct"];
const state2: State[] = ["correct", "correct", "correct", "wrong", "wrong"];
const state3: State[] = Array(5).fill("correct");

const Main = styled.View`
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

const ScrollView = styled.ScrollView``;

const Content = styled.View`
  margin: 10px 20px;
  gap: 10px;
`;

const Explainer = styled.View`
  align-items: flex-start;
  padding: 10px;
  border-radius: 6px;
  background-color: lightgray;
`;

const Text = styled.Text`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: gray;
`;

export const Help = () => {
  return (
    <Main>
      <Header>
        <Heading>How to play</Heading>
      </Header>
      <ScrollView>
        <Content>
          <Text>
            You have to guess the hidden word in 6 tries and the color of the
            letters changes to show how close you are.
          </Text>

          <Text>To start the game, just enter any word, for example:</Text>

          <CompletedRow word={guess1} state={state1} />

          <Explainer>
            <Text>T, B are not in the target word at all.</Text>
            <Text>A, L is in the word but in the wrong spot.</Text>
            <Text>E is in the word and in the wrong spot.</Text>
          </Explainer>

          <Text>Another try to find matching letters in the target word.</Text>

          <CompletedRow word={guess2} state={state2} />

          <Text>So close!</Text>

          <CompletedRow word={target} state={state3} />

          <Text style={{ fontWeight: "bold" }}>Got it 🏆</Text>
        </Content>
      </ScrollView>
    </Main>
  );
};

export default Help;
