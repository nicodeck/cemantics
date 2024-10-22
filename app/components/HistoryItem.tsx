import { View, Text, StyleSheet } from "react-native";

interface Props {
  guess: string;
  score?: number;
  youWin?: boolean;
}

export const HistoryItem = ({ guess, score, youWin }: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: score
            ? youWin
              ? "lightgreen"
              : "#fff"
            : "lightcoral",
        },
      ]}
    >
      <Text style={styles.guess}>{guess}</Text>
      {score ? (
        <Text style={styles.score}>{score.toFixed(0)} / 100</Text>
      ) : (
        <Text style={styles.score}>Unknown word</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  guess: {},
  score: {},
});
