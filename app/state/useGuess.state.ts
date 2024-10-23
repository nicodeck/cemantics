import { atom } from "jotai";

const guessAtom = atom("");

export function useGuess() {
  return { guessAtom };
}
