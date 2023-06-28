import { StyleSheet } from "react-native";
import { styled } from "styled-components/native";
import { randomUUID as uuid } from "expo-crypto";
import { computeKeyState } from "../../lib/utils";
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

const rowTop = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"] as const;
const rowMid = ["A", "S", "D", "F", "G", "H", "J", "K", "L"] as const;
const rowBot = ["Z", "X", "C", "V", "B", "N", "M"] as const;

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

  return (
    <Container>
      <Row>
        {rowTop.map((keyCode) => (
          <Key
            key={uuid()}
            keyCode={keyCode}
            state={stateMap.get(keyCode)}
            onPress={onKey}
          />
        ))}
      </Row>

      <Row>
        {rowMid.map((keyCode) => (
          <Key
            key={uuid()}
            keyCode={keyCode}
            state={stateMap.get(keyCode)}
            onPress={onKey}
          />
        ))}
      </Row>

      <Row>
        <Key
          key={uuid()}
          keyCode={"BKSP"}
          onPress={onBack}
          icon="delete"
          style={styles.metaKey}
        />

        {rowBot.map((keyCode) => (
          <Key
            key={uuid()}
            keyCode={keyCode}
            state={stateMap.get(keyCode)}
            onPress={onKey}
          />
        ))}

        <Key
          key={uuid()}
          keyCode={"Enter"}
          onPress={onEnter}
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
