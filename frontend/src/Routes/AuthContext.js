import React, { createContext, useContext } from "react";
import { useAuth } from "./UseAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
