import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserRole } from "@/types";

interface User {
  id: string | null;
  name: string | null;
  role: UserRole | null;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (userData: { id: string; name: string; role: UserRole }) => void;
  logout: () => void;
}

const defaultContext: AuthContextType = {
  currentUser: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuthContext = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (userData: { id: string; name: string; role: UserRole }) => {
    setCurrentUser({
      id: userData.id,
      name: userData.name,
      role: userData.role,
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
