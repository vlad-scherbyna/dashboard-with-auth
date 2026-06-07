import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  userData: {
    id: string;
    name: string;
    email: string;
    smeId: string;
  };
  exp: number;
}

interface AuthContextValue {
  token: string | null;
  user: TokenPayload['userData'] | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('token'));

  const user = token ? (jwtDecode<TokenPayload>(token)).userData : null;

  useEffect(() => {
    if (!token) return;
    const { exp } = jwtDecode<TokenPayload>(token);
    const msLeft = exp * 1000 - Date.now();
    if (msLeft <= 0) { logout(); return; }
    const timer = setTimeout(logout, msLeft);
    return () => clearTimeout(timer);
  }, [token]);

  useEffect(() => {
    const handler = () => logout();
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, []);

  const setToken = (t: string) => {
    localStorage.setItem('token', t);
    setTokenState(t);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
