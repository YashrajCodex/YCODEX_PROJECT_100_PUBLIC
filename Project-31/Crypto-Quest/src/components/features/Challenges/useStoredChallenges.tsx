import { useContext } from "react";
import { ChallengesContext } from "./ChallengesContext";

export function useStoredChallenges() {
  const context = useContext(ChallengesContext);
  if (!context)
    throw new Error("useStoredChallenges used outside the ChallengesProvider.");

  return context;
}
