"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  // Effect
  useEffect(() => {
    const storedToken = Cookies.get('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  // Handler
  const login = (newToken: string) => {
    Cookies.set('authToken', newToken, { expires: 7 });
    setToken(newToken);
  };
  const logout = () => {
    Cookies.remove('authToken');
    setToken(null);
  };
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 