import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export interface AuthContext {
  isAuthenticated: boolean;
  // toggleAuthenticated: () => void;
}
function AuthProvider({ children }) {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const isAuthenticated = useSelector((state:RootState)=> state.user.isAuthenticated)
  // if(savedAuth) setIsAuthenticated(()=> savedAuth)
  // function toggleAuthenticated() {
  //   setIsAuthenticated((set) => !set);
  //   // console.log("isAuth")
  // }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
