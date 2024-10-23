import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useGuessWord } from "../api/useGuessWord";
import { useGuess } from "../state/useGuess.state";
import { useAtom } from "jotai";
import { useHistory } from "../state/useHistory.state";

export function GuessInput() {
  const { guessAtom } = useGuess();
  const { addGuessToHistory } = useHistory();

  const [guess, setGuess] = useAtom(guessAtom);

  const handleSend = async () => {
    if (guess === "") {
      return;
    }
    try {
      const guessResult = await useGuessWord({ guess: guess });

      addGuessToHistory(guessResult);
      setGuess("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
}

const styles = StyleSheet.create({
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
