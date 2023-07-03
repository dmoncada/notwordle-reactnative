import { styled } from "styled-components/native";
import { LetterState } from "../../lib/LetterState";

const Container = styled.View<{ state: LetterState }>`
  width: 50px;
  height: 50px;
  border-width: 2px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  border-color: ${({ theme, state }) => theme.cell.border[state].toString()};
  background-color: ${({ theme, state }) => theme.cell.background[state].toString()};
`;

const Label = styled.Text<{ state: LetterState }>`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme, state }) =>
    ["wrong", "inword", "correct"].includes(state)
      ? theme.textInverted.toString()
      : theme.text.toString()};
`;

const Hint = styled.Text`
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  bottom: 30px;
  left: 34px;
  color: ${({ theme }) => theme.textInverted.toString()};
`;

type Props = {
  letter: string;
  state: LetterState;
  hint?: number;
};

const Cell = ({ letter, state, hint }: Props) => {
  return (
    <Container state={state}>
      <Label state={state}>{letter}</Label>
      {hint > 1 ? <Hint>{hint}</Hint> : null}
    </Container>
  );
};

export default Cell;
