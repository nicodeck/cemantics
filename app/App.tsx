import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { HistoryItem } from "./components/HistoryItem";
import { useHistory } from "./state/useHistory.state";
import { GuessInput } from "./components/GuessInput";
import { useAtomValue } from "jotai";

export default function App() {
  const { historyAtom } = useHistory();

  const history = useAtomValue(historyAtom);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>CemantiCS</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <HistoryItem
            guess={item.guess}
            score={item.score}
            youWin={item.youWin}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.history}
      />
      <GuessInput />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  history: {
    flex: 1,
  },
});
