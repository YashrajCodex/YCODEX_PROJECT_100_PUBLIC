import { ChildrenProps } from "@/lib/interfaces/globalInterface";
import { useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }: ChildrenProps) {
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  function login(email: string, password: string) {
    if (email && password) {
      setEmail(email);
      setPassword(password);
      setIsSignedIn(true);
      setError("");
      console.log("Email: ", email, "Pass: ", password)
    } else {
      setError("Invalid email or password");
    }
  }
  function logout() {
    setEmail("");
    setPassword("");
    setIsSignedIn(false);
  }
  return (
    <AuthContext.Provider
      value={{ email, password, isSignedIn, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
