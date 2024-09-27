import { createContext } from "react";


interface AuthContextType {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginOpen: boolean;
  toggleLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
