import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { createContext } from '../../contexts/create-context';

interface TokenPayload {
  userData: {
    id: string;
    name: string;
    email: string;
    smeId: string;
  };
  exp: number;
}

export interface AuthContextValue {
  token: string | null;
  user: TokenPayload['userData'] | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const [AuthContext, useAuthContext] = createContext<AuthContextValue>();
export { useAuthContext };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('token'));

  const user = token ? jwtDecode<TokenPayload>(token).userData : null;

  const logout = () => {
    localStorage.removeItem('token');
    setTokenState(null);
  };

  const setToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setTokenState(newToken);
  };

  useEffect(() => {
    if (!token) return;
    const { exp } = jwtDecode<TokenPayload>(token);
    const msLeft = exp * 1000 - Date.now();
    if (msLeft <= 0) { logout(); return; }
    const timer = setTimeout(logout, msLeft);
    return () => clearTimeout(timer);
  }, [token]);

  useEffect(() => {
    window.addEventListener('auth:logout', logout);
    return () => window.removeEventListener('auth:logout', logout);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
