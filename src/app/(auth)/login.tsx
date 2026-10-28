import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
  if (!username.trim() || !password) {
    alert("Fyll i användarnamn och lösenord");
    return;
  }

  alert("Fälten är ifyllda");
};

  return (
    <View style={styles.container}>
    <Text style={styles.title}>BookList</Text>
<Text style={styles.subtitle}>
  Spara böcker du vill läsa och håll koll på vad du läst.
</Text>


    <View style={styles.formPlaceholder}>
  <Text style={{ fontSize: 18, fontWeight: "bold" }}>Logga in</Text>
  <Text>Användarnamn</Text>
  <TextInput
    style={styles.inputPlaceholder}
    placeholder="Användarnamn"
    value={username}
    onChangeText={setUsername}
    autoCapitalize="none"
  />

  <Text>Lösenord</Text>
  <TextInput
    style={styles.inputPlaceholder}
    placeholder="Lösenord"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
  />
</View>

      {/* Navigationsknappar / åtgärder */}
      <View style={styles.actions}>
        <Pressable
  style={[styles.button, styles.primaryButton]}
  onPress={handleLogin}
>
  <Text style={styles.primaryButtonText}>Logga in</Text>
</Pressable>
        <Link
  href="/(auth)/register"
  style={[styles.button, styles.secondaryButton]}
>
  <Text style={styles.secondaryButtonText}>Registrera</Text>
</Link>

        

        
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  title: {
  fontSize: 28,
  fontWeight: "bold",
  marginBottom: 8,
  textAlign: "center",
},
  subtitle: {
  fontSize: 16,
  color: "#666666",
  marginBottom: 32,
  textAlign: "center",
},
  formPlaceholder: {
    gap: 16,
    marginBottom: 24,
  },
  inputPlaceholder: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 8,
  },
  actions: {
    gap: 12,
  },
  button: {
    padding: 14,
    borderRadius: 8,
    textAlign: "center",
    overflow: "hidden",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  secondaryButtonText: {
    color: "#1e293b",
    textAlign: "center",
  },
  linkText: {
    marginTop: 8,
    textAlign: "center",
  },
  link: {
    color: "#2563eb",
    textAlign: "center",
  },
});

