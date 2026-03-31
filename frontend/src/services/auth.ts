import { api } from "./api";
import { User } from "../types";

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export async function login(payload: { email: string; password: string }) {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function register(payload: { name: string; email: string; password: string }) {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function me() {
  const { data } = await api.get<User>("/auth/me");
  return data;
}

