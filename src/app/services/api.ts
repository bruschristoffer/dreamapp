import * as SecureStore from "expo-secure-store";
import { Alert, Platform } from "react-native";

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://dreamapp-y1lt.onrender.com";

export const BOOK_STATUSES = ["Vill läsa", "Läser", "Läst"] as const;
export type BookStatus = (typeof BOOK_STATUSES)[number];

export interface Book {
  id: number | string;
  user_id?: number | string;
  title: string;
  author: string;
  status?: string;
  is_read?: boolean;
  created_at?: string;
}

export async function getToken(): Promise<string | null> {
  if (Platform.OS === "web") {
    return sessionStorage.getItem("token");
  }
  return await SecureStore.getItemAsync("token");
}

export async function saveToken(token: string): Promise<void> {
  if (Platform.OS === "web") {
    sessionStorage.setItem("token", token);
  } else {
    await SecureStore.setItemAsync("token", token);
  }
}

export async function removeToken(): Promise<void> {
  if (Platform.OS === "web") {
    sessionStorage.removeItem("token");
  } else {
    await SecureStore.deleteItemAsync("token");
  }
}

export function showAlert(title: string, message?: string) {
  if (Platform.OS === "web") {
    alert(message ? `${title}: ${message}` : title);
  } else {
    Alert.alert(title, message);
  }
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  // Automatically prefix auth endpoints with /api if needed by backend route structure
  const urlPath = cleanEndpoint.startsWith("/auth")
    ? `/api${cleanEndpoint}`
    : cleanEndpoint;

  const response = await fetch(`${API_URL}${urlPath}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || errorData.error || `Fel: ${response.status}`,
    );
  }

  if (response.status === 204) return null as T;

  return response.json();
}
