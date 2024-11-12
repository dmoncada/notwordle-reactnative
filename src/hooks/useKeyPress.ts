import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export const useKeyPress = (keys: readonly string[], handler: (event: KeyboardEvent) => void) => {
  const handlerRef = useRef(handler);
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }
      if (keys.some((key) => key === event.key)) {
        handlerRef.current(event);
      }
    },
    [keys]
  );

  useEffect(() => {
    window.addEventListener && window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener && window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};
