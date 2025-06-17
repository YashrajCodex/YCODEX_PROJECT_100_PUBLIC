import { AuthContext } from "@/context/AuthContext";
import { AuthContextType } from "@/lib/interfaces/globalInterface";
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
  // Use the useContext hook to get the current value of AuthContext.
  // This value will be whatever was passed to the `value` prop of the nearest <AuthContext.Provider>.
  const context = useContext<AuthContextType | null>(AuthContext);

  // Check if the context is undefined. This happens if useAuth is called outside of an AuthProvider.
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Return the context value, which conforms to AuthContextType.
  return context;
};
