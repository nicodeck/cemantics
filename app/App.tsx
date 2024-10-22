import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { useGuessWord } from "./api/useGuessWord";

export default function App() {
  const [guess, setGuess] = useState("");

  const handleSend = () => {
    useGuessWord({ guess: guess }).then((value) => {
      alert(value.wordIsOk ? `Correct! Value: ${value.value}` : "Incorrect");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.guessTextInputLabel}>Guess the word:</Text>
      <TextInput
        value={guess}
        onChangeText={setGuess}
        style={styles.guessTextInput}
        autoCapitalize="none"
      />
      <Pressable style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  guessTextInputLabel: {
    marginBottom: 10,
  },
  guessTextInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 200,
    marginBottom: 10,
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
