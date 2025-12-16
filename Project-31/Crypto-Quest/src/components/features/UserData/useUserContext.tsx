import { useContext } from "react";
import { UserContext } from "./UserContext";
export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext used outside the UserProvider");
  }

  return context;
}
