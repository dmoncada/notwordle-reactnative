import { styled } from "styled-components/native";
import { LetterState } from "../../utils/constants";

const getBorderColor = (state: LetterState) => {
  switch (state) {
    default:
    case "unused":
      return "#dfe1e9";
    case "used":
      return "#a8adbe";
    case "wrong":
      return "#a6aec3";
    case "inword":
      return "#ebc450";
    case "correct":
      return "#85b65d";
  }
};

const getBackgroundColor = (state: LetterState) => {
  switch (state) {
    default:
    case "unused":
      return "#fbfcff";
    case "used":
      return "#fbfcff";
    case "wrong":
      return "#a6aec3";
    case "inword":
      return "#ebc450";
    case "correct":
      return "#85b65d";
  }
};

const getFontColor = (state: LetterState) => {
  switch (state) {
    default:
    case "unused":
    case "used":
      return "black";
    case "wrong":
    case "inword":
    case "correct":
      return "white";
  }
};

const Container = styled.View<{ state: LetterState }>`
  width: 50px;
  height: 50px;
  border-width: 2px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  border-color: ${(props) => getBorderColor(props.state)};
  background-color: ${(props) => getBackgroundColor(props.state)};
`;

const Label = styled.Text<{ state: LetterState }>`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => getFontColor(props.state)};
`;

const Cell = ({ letter, state }: { letter?: string; state?: LetterState }) => {
  return (
    <Container state={state}>
      <Label state={state}>{letter}</Label>
    </Container>
  );
};

export default Cell;
