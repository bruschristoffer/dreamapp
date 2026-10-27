import { Stack } from "expo-router";

export default function RootLayout() {
  // Placeholder för auth guard:
  // T.ex. const isAuthenticated = false;
  // if (!isAuthenticated) return <Redirect href="/(auth)/login" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="book/[id]"
        options={{
          headerShown: true,
          title: "Bokdetaljer",
        }}
      />
    </Stack>
  );
}
