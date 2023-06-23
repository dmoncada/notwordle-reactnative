import { StyleSheet } from "react-native";
import { styled } from "styled-components/native";
import { randomUUID } from "expo-crypto";
import { computeKeyState } from "../../lib/utils";
import Key from "./Key";

const Container = styled.View`
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  gap: 4px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 35px;
  gap: 4px;
`;

const Keyboard = ({
  target,
  guesses,
  onBack,
  onEnter,
  onKey,
}: {
  target: string;
  guesses: string[];
  onBack: () => void;
  onEnter: () => void;
  onKey: (arg: string) => void;
}) => {
  const stateMap = computeKeyState(target, guesses);
  const rowTop = Array.from("QWERTYUIOP");
  const rowMid = Array.from("ASDFGHJKL");
  const rowBot = Array.from("ZXCVBNM");

  return (
    <Container>
      <Row>
        {rowTop.map((keyCode) => (
          <Key
            key={randomUUID()}
            keyCode={keyCode}
            state={stateMap.get(keyCode)}
            onPress={onKey}
          />
        ))}
      </Row>

      <Row>
        {rowMid.map((keyCode) => (
          <Key
            key={randomUUID()}
            keyCode={keyCode}
            state={stateMap.get(keyCode)}
            onPress={onKey}
          />
        ))}
      </Row>

      <Row>
        <Key
          key={randomUUID()}
          keyCode={"BKSP"}
          onPress={(_) => onBack()}
          icon="backspace-outline"
          style={styles.metaKey}
        />

        {rowBot.map((keyCode) => (
          <Key
            key={randomUUID()}
            keyCode={keyCode}
            state={stateMap.get(keyCode)}
            onPress={onKey}
          />
        ))}

        <Key
          key={randomUUID()}
          keyCode={"Enter"}
          onPress={(_) => onEnter()}
          style={styles.metaKey}
        />
      </Row>
    </Container>
  );
};

const styles = StyleSheet.create({
  metaKey: {
    minWidth: 50,
  },
});

export default Keyboard;
