import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#f8f9fa",
        },
        headerTintColor: "#1a1a1a",
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen name="login" options={{ title: "Logga in" }} />
      <Stack.Screen name="register" options={{ title: "Skapa konto" }} />
    </Stack>
  );
}
