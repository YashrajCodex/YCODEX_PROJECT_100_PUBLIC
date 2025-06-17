export interface ChildrenProps {
    children: React.ReactNode;
}

export interface AuthContextProps {
    email: string | null;
    setEmail: React.Dispatch<React.SetStateAction<string | null>>;
    password: string | null;
    setPassword: React.Dispatch<React.SetStateAction<string | null>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface AuthContextType {
  email: string | null;
  password: string | null;
  isSignedIn: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}