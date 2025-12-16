import { createContext } from "react";
import { userContextType } from "./UserProvider";

export const UserContext = createContext<userContextType | null>(null);
