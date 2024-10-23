import { atom } from "jotai";

const historyAtom = atom<Guess[]>([]);
const idAtom = atom(0);

export function useHistory() {
  return { historyAtom, idAtom };
}
