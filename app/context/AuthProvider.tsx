import { useEffect, useState, ReactNode } from "react";
import AuthContext from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginOpen: boolean;
  toggleLogin: () => void;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const isAuthenticated = typeof window !== "undefined" ? localStorage.getItem("login") : null;

  useEffect(() => {
    if (isAuthenticated) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [isAuthenticated]);

  const toggleLogin = () => {
    setIsLoginOpen((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoginOpen, toggleLogin } as AuthContextType}>
      {children}
    </AuthContext.Provider>
  );
};
