import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";

export default function TabLayout() {
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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#64748b",
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Mina böcker",
          tabBarLabel: "Mina böcker",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={24}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Lägg till bok",
          tabBarLabel: "Lägg till",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={24}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil / Inställningar",
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color as string}
            />
          ),
        }}
      />
    </Tabs>
  );
}
