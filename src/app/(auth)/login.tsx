import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { apiRequest, saveToken } from "../services/api";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      Alert.alert("Fyll i användarnamn och lösenord");
      return;
    }

    try {
      setLoading(true);
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (data?.token) {
        await saveToken(data.token);
        Alert.alert("Inloggningen lyckades!");
        router.replace("/(tabs)");
      } else {
        Alert.alert(data?.message || "Kunde inte logga in");
      }
    } catch (error: any) {
      Alert.alert(error.message || "Kunde inte ansluta till servern");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookList</Text>
      <Text style={styles.subtitle}>
        Spara böcker du vill läsa och håll koll på vad du läst.
      </Text>

      <View style={styles.form}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Logga in</Text>
        <Text>Användarnamn</Text>
        <TextInput
          style={styles.input}
          placeholder="Användarnamn"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text>Lösenord</Text>
        <TextInput
          style={styles.input}
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
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.primaryButtonText}>Logga in</Text>
          )}
        </Pressable>

        <Link href="/(auth)/register" style={styles.registerLink}>
          Registrera
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
  form: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 8,
  },
  actions: {
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    textAlign: "center",
    overflow: "hidden",
  },
  primaryButton: {
    backgroundColor: "#000000",
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
  registerLink: {
    color: "#000000",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
});
