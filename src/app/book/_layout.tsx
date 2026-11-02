
import { Redirect, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";

export default function BookLayout() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token =
          Platform.OS === "web"
            ? sessionStorage.getItem("token")
            : await SecureStore.getItemAsync("token");

        setLoggedIn(!!token);
      } catch (error) {
        setLoggedIn(false);
      } finally {
        setChecking(false);
      }
    };

    checkLogin();
  }, []);

  if (checking) {
    return <Text>Kontrollerar inloggning...</Text>;
  }

  if (!loggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
