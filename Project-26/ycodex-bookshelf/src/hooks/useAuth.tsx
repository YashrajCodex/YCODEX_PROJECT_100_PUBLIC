import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContext as authType } from "@/contexts/AuthProvider";

export function useAuth() {
  const context = useContext<authType>(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext is used outside the AuthProvider");
  return context;
}
