import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { ReturnValue } from "../api/useGuessWord";
import { useGuess } from "./useGuess.state";

const historyAtom = atom<Guess[]>([]);
const idAtom = atom(0);

export function useHistory() {
  const { guessAtom } = useGuess();

  const [history, setHistory] = useAtom(historyAtom);
  const [id, setId] = useAtom(idAtom);
  const guess = useAtomValue(guessAtom);

  function addGuessToHistory(guessResult: ReturnValue) {
    const guessAlreadyExists = history.some((item) => item.guess === guess);
    if (guessAlreadyExists) return;
    const newGuess = guessResult.wordIsOk
      ? {
          id: id,
          guess: guess,
          score: guessResult.value,
          youWin: guessResult.youWin,
        }
      : { id: id, guess: guess };

    setHistory((prevHistory) =>
      [...prevHistory, newGuess].sort((a, b) => {
        if (a.score == undefined && b.score == undefined) return 0;
        if (a.score == undefined) return 1;
        if (b.score == undefined) return -1;
        return b.score - a.score;
      })
    );
    setId(id + 1);
  }

  return { historyAtom, idAtom, addGuessToHistory };
}
