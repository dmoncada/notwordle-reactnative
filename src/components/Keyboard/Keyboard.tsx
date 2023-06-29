import { StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { styled } from "styled-components/native";
import { randomUUID as uuid } from "expo-crypto";
import { useStore } from "../../stores/RootStore";
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

const keysTop = rowTop.map((letter) => ({ id: uuid(), keyCode: letter }));
const keysMid = rowMid.map((letter) => ({ id: uuid(), keyCode: letter }));
const keysBot = rowBot.map((letter) => ({ id: uuid(), keyCode: letter }));

const Keyboard = () => {
  const { target, previousGuesses, onKey, onBack, onEnter } = useStore();
  const stateMap = computeKeyState(target, previousGuesses);

  return (
    <Container>
      <Row>
        {keysTop.map(({ id, keyCode }) => (
          <Key
            key={id}
            keyCode={keyCode}
            state={stateMap[keyCode]}
            onPress={onKey}
          />
        ))}
      </Row>

      <Row>
        {keysMid.map(({ id, keyCode }) => (
          <Key
            key={id}
            keyCode={keyCode}
            state={stateMap[keyCode]}
            onPress={onKey}
          />
        ))}
      </Row>

      <Row>
        <Key
          key={"BKSP"}
          keyCode={"BKSP"}
          onPress={onBack}
          icon="delete"
          style={styles.metaKey}
        />

        {keysBot.map(({ id, keyCode }) => (
          <Key
            key={id}
            keyCode={keyCode}
            state={stateMap[keyCode]}
            onPress={onKey}
          />
        ))}

        <Key
          key={"Enter"}
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

export default observer(Keyboard);
