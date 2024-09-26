import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const isAuthenticated = localStorage.getItem("login");

  useEffect(() => {
    if (isAuthenticated) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  });
  
  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen)
 
   };

  // if (auth === null) {
  //   return <div>Loading...</div>;
  // }
  return (
    <AuthContext.Provider value={{ auth, setAuth,isLoginOpen,toggleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
