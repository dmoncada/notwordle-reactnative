import { useEffect, useState } from "react";
import { RootStore, RootStoreProvider } from "./src/stores/RootStore";
import Shell from "./src/components/Shell";

export default function App() {
  const [rootStore, setRootStore] = useState<RootStore>(null);
  const [loading, setLoading] = useState(true);

  const setup = async () => {
    const store = new RootStore();
    await store.loadWordsAsync();
    store.reset();

    setRootStore(store);
    setLoading(false);
  };

  useEffect(() => {
    setup();
  }, []);

  if (loading) return null;

  return (
    <RootStoreProvider value={rootStore}>
      <Shell />
    </RootStoreProvider>
  );
}
