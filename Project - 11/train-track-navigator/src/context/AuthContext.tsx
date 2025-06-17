import { AuthContextType } from "@/lib/interfaces/globalInterface";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
