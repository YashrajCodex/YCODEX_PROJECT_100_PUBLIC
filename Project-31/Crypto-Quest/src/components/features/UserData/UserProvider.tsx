import {
  getAllUser,
  initializeUser,
  LogOutUser,
  removeUser,
  UserProgress,
} from "@/lib/storage/indexDB";
import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export interface userContextType {
  user: UserProgress | null;
  setUser: React.Dispatch<React.SetStateAction<UserProgress>>;
  LoginUser: (userName: string, uId: string) => void;
  LogoutUser: () => void;
  delUser: () => void;
  loading: boolean;
  error: string;
}
export default function UserProvider({ children }) {
  const [user, setUser] = useState<UserProgress>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  async function loadUser() {
    setLoading(true);
    try {
      const all = await getAllUser();
      const found = all?.find((u) => u?.current);
      setUser(found);
      if (!found) setError("Did not find user!");
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadUser();
  }, []);

  async function LoginUser(userName: string, uId: string) {
    const newUser = await initializeUser(userName.trim(), uId);
    setUser(newUser);
  }
  async function LogoutUser() {
    setLoading(true);
    try {
      await LogOutUser(user?.uId);
      setUser(null);
      navigate("/");
    } catch (e) {
      setError(e?.message || "Failed to logout");
    } finally {
      setLoading(false);
    }
  }
  async function delUser() {
    setLoading(true);
    try {
      await removeUser(user?.uId);
      setUser(null);
      navigate("/");
    } catch (e) {
      setError(e?.message || "Failed to logout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, LoginUser, LogoutUser, delUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}
