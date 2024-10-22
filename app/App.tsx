import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { useGuessWord } from "./api/useGuessWord";
import { HistoryItem } from "./components/HistoryItem";

interface Guess {
  id: number;
  guess: string;
  score?: number;
  youWin?: boolean;
}

export default function App() {
  const [guess, setGuess] = useState("");
  const [history, setHistory] = useState<Guess[]>([]);
  const [id, setId] = useState(0);

  const handleSend = async () => {
    try {
      const guessResult = await useGuessWord({ guess: guess });
      if (!guessResult.wordIsOk) {
        history.push({ id: id, guess: guess });
      } else {
        history.push({
          id: id,
          guess: guess,
          score: guessResult.value,
          youWin: guessResult.youWin,
        });
      }
      setId(id + 1);
    } catch (error) {
      console.error(error);
    }
    console.log(history);
  };

  const fakeData = [];
  for (let i = 0; i < 100; i++) {
    fakeData.push(`word${i}`);
  }

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.guessContainer}>
          <TextInput
            value={guess}
            onChangeText={setGuess}
            style={styles.guessTextInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Guess the word..."
          />
          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
  guessContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "lightgray",
    gap: 10,
  },
  guessTextInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 200,
    flex: 1,
  },
  sendButton: {
    backgroundColor: "#4FA1CA",
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "white",
  },
});
