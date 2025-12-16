import { createContext } from "react";
import { ChallengesContextType } from "./ChallengesProvider";

export const ChallengesContext = createContext<
  ChallengesContextType | undefined
>(undefined);
