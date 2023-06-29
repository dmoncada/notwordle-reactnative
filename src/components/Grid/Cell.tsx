import { styled } from "styled-components/native";
import { LetterState } from "../../lib/LetterState";

const Container = styled.View<{ state: LetterState }>`
  width: 50px;
  height: 50px;
  border-width: 2px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  border-color: ${({ theme, state }) =>
    theme.cell.border[state].toString()};
  background-color: ${({ theme, state }) =>
    theme.cell.background[state].toString()};
`;

const Label = styled.Text<{ state: LetterState }>`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme, state }) =>
    state === 'wrong' || state === "inword" || state === "correct"
      ? theme.textInverted.toString()
      : theme.text.toString()};
`;

const Cell = ({ letter, state }: { letter?: string; state?: LetterState }) => {
  state = state || "unused";

  return (
    <Container state={state}>
      <Label state={state}>{letter}</Label>
    </Container>
  );
};

export default Cell;
