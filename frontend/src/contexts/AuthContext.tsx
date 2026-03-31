import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { login, me, register } from "../services/auth";
import { User } from "../types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  loginAction: typeof login;
  registerAction: typeof register;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("carhub.accessToken");
    if (!token) return;

    me()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("carhub.accessToken");
        localStorage.removeItem("carhub.refreshToken");
      });
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loginAction: async (payload: { email: string; password: string }) => {
        const result = await login(payload);
        localStorage.setItem("carhub.accessToken", result.accessToken);
        localStorage.setItem("carhub.refreshToken", result.refreshToken);
        setUser(result.user);
        return result;
      },
      registerAction: async (payload: { name: string; email: string; password: string }) => {
        const result = await register(payload);
        localStorage.setItem("carhub.accessToken", result.accessToken);
        localStorage.setItem("carhub.refreshToken", result.refreshToken);
        setUser(result.user);
        return result;
      },
      logout: () => {
        localStorage.removeItem("carhub.accessToken");
        localStorage.removeItem("carhub.refreshToken");
        setUser(null);
      }
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

