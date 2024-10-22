import axios, { AxiosError } from "axios";

interface Props {
  guess: string;
}

type ReturnValue =
  | { wordIsOk: false }
  | { wordIsOk: true; value: number; youWin: boolean };

export const useGuessWord = async ({ guess }: Props): Promise<ReturnValue> => {
  console.log("Sending guess:", guess);

  try {
    const res = await axios.get(
      `https://nicolasdesc-dojo-sipios-12.deno.dev/?guess=${guess}`
    );
    return {
      wordIsOk: true,
      value: res.data.value,
      youWin: res.data.value === 100,
    };
  } catch (error) {
    return { wordIsOk: false };
  }
};
