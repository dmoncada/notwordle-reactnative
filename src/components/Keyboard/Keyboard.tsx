import { observer } from "mobx-react-lite";
import { StyleSheet } from "react-native";
import { styled } from "styled-components/native";
import { useKeyPress } from "../../hooks/useKeyPress";
import { ASCII_ALPHA, ASCII_UPPERCASE } from "../../lib/utils";
import { useStore } from "../../stores/RootStore";
import Key from "./Key";

const Container = styled.View`
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 35px;
  gap: 4px;
`;

const Keyboard = () => {
  const { onKey, onBack, onEnter, keyboardState, settings } = useStore();
  const swapButtons = settings.swapButtons;

  useKeyPress([...ASCII_ALPHA, ...ASCII_UPPERCASE, "Backspace", "Enter"], (event) => {
    const key = event.key;
    if (key === "Backspace") {
      onBack();
    } else if (key === "Enter") {
      onEnter();
    } else {
      onKey(key.toUpperCase());
    }
  });

  const backKey = <Key keyCode="BKSP" state="unused" style={styles.metaKey} onPress={onBack} icon="delete" />;
  const enterKey = <Key keyCode="Enter" state="unused" style={styles.metaKey} onPress={onEnter} />;

  return (
    <Container>
      <Row>
        <Key keyCode="Q" state={keyboardState["Q"]} onPress={onKey} />
        <Key keyCode="W" state={keyboardState["W"]} onPress={onKey} />
        <Key keyCode="E" state={keyboardState["E"]} onPress={onKey} />
        <Key keyCode="R" state={keyboardState["R"]} onPress={onKey} />
        <Key keyCode="T" state={keyboardState["T"]} onPress={onKey} />
        <Key keyCode="Y" state={keyboardState["Y"]} onPress={onKey} />
        <Key keyCode="U" state={keyboardState["U"]} onPress={onKey} />
        <Key keyCode="I" state={keyboardState["I"]} onPress={onKey} />
        <Key keyCode="O" state={keyboardState["O"]} onPress={onKey} />
        <Key keyCode="P" state={keyboardState["P"]} onPress={onKey} />
      </Row>

      <Row>
        <Key keyCode="A" state={keyboardState["A"]} onPress={onKey} />
        <Key keyCode="S" state={keyboardState["S"]} onPress={onKey} />
        <Key keyCode="D" state={keyboardState["D"]} onPress={onKey} />
        <Key keyCode="F" state={keyboardState["F"]} onPress={onKey} />
        <Key keyCode="G" state={keyboardState["G"]} onPress={onKey} />
        <Key keyCode="H" state={keyboardState["H"]} onPress={onKey} />
        <Key keyCode="J" state={keyboardState["J"]} onPress={onKey} />
        <Key keyCode="K" state={keyboardState["K"]} onPress={onKey} />
        <Key keyCode="L" state={keyboardState["L"]} onPress={onKey} />
      </Row>

      <Row>
        {swapButtons ? enterKey : backKey}
        <Key keyCode="Z" state={keyboardState["Z"]} onPress={onKey} />
        <Key keyCode="X" state={keyboardState["X"]} onPress={onKey} />
        <Key keyCode="C" state={keyboardState["C"]} onPress={onKey} />
        <Key keyCode="V" state={keyboardState["V"]} onPress={onKey} />
        <Key keyCode="B" state={keyboardState["B"]} onPress={onKey} />
        <Key keyCode="N" state={keyboardState["N"]} onPress={onKey} />
        <Key keyCode="M" state={keyboardState["M"]} onPress={onKey} />
        {swapButtons ? backKey : enterKey}
      </Row>
    </Container>
  );
};

const styles = StyleSheet.create({
  metaKey: {
    minWidth: 50,
  },
});

export default observer(Keyboard);
