import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://dreamapp-y1lt.onrender.com/api";

async function getToken(): Promise<string | null> {
  if (Platform.OS === "web") {
    return sessionStorage.getItem("token");
  }
  return await SecureStore.getItemAsync("token");
}

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = await getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || errorData.message || `Fel: ${response.status}`,
    );
  }

  if (response.status === 204) return null;

  return response.json();
}
