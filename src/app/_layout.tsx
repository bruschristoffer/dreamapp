import { Stack } from "expo-router";

export default function RootLayout() {
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
      <Stack.Screen
        name="list/[id]"
        options={{
          headerShown: true,
          title: "Läslista",
        }}
      />
    </Stack>
  );
}
