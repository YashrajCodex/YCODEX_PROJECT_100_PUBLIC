import { createContext } from "react";
import { AuthContext as typeAuthContext } from "./AuthProvider";

export const AuthContext = createContext<typeAuthContext | undefined>(undefined);
