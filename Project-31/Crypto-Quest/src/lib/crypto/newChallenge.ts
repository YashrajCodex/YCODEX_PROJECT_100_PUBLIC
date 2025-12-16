import { v5 as uuidv5 } from "uuid";
import { sentence } from "txtgen";
import { Challenge } from "@/data/challenges";

export default function selectChallengeNew() {
  const randomNumber = Math.random() * 2 + 1;

  switch (randomNumber) {
    case 0:
      return "caesar";

    case 1:
      return "vigenere";
    default:
      return "frequency-analysis";
  }
}

export function generateCaesarChallenge() {
  const randomNumber = Math.floor(Math.random() * 26);
  const randomId = uuidv5("crypto-caesar", uuidv5.URL);
  const randomText = sentence();

  const cipherText = randomText
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);

      if (code < 65 || code > 90) return char;

      const offset = (((code - 65 + randomNumber) % 26) + 26) % 26;

      return String.fromCharCode(65 + offset);
    })
    .join("");

  const diff = () => {
    if (randomNumber > 0 && randomNumber < 10) {
      return "easy";
    } else if (randomNumber > 10 && randomNumber < 18) {
      return "medium";
    }
  };

  const newChallenge: Challenge = {
    cId: randomId,
    title: "Caesar's Message",
    description: `Decrypt the message encrypted with Caesar cipher (shift of ${randomNumber})`,
    difficulty: diff(),
    category: "classic",
    xpReward: 100,
    prompt: cipherText,
    hint1: `Try shifting each letter back by ${randomNumber} positions in the alphabet`,
    solution: randomText,
    explanation: `Caesar cipher shifts each letter by a fixed number. Here, shift=${randomNumber} was used. To decrypt, shift by ${randomNumber}. This cipher is extremely weak and should never be used for real security.`,
  };
  return newChallenge;
}
