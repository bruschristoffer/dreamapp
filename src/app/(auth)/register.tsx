import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { apiRequest, saveToken } from "../services/api";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    setErrorMessage("");

    if (!username.trim() || !password || !confirmPassword) {
      setErrorMessage("Fyll i alla fält");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Lösenorden matchar inte");
      return;
    }

    try {
      setLoading(true);
      const registerRes = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      let token = registerRes?.token;

      if (!token) {
        const loginRes = await apiRequest("/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username: username.trim(),
            password: password,
          }),
        });
        token = loginRes?.token;
      }

      if (token) {
        await saveToken(token);
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Kunde inte skapas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skapa konto</Text>
      <Text style={styles.subtitle}>Börja hålla koll på dina böcker</Text>
      {errorMessage !== "" && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
      <View style={styles.form}>
        <Text style={styles.label}>Användarnamn</Text>
        <TextInput
          style={styles.input}
          placeholder="Skriv ditt namn"
          value={username}
          onChangeText={(val) => {
            setUsername(val);
            setErrorMessage("");
          }}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Lösenord</Text>
        <TextInput
          style={styles.input}
          placeholder="Skriv lösenord"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            setErrorMessage("");
          }}
          secureTextEntry
        />

        <Text style={styles.label}>Bekräfta lösenord</Text>
        <TextInput
          style={styles.input}
          placeholder="Upprepa lösenord"
          value={confirmPassword}
          onChangeText={(val) => {
            setConfirmPassword(val);
            setErrorMessage("");
          }}
          secureTextEntry
        />
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.primaryButtonText}>Skapa konto</Text>
          )}
        </Pressable>

        <Link href="/(auth)/login" style={styles.loginLink}>
          Har du redan ett konto? Logga in
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
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 24,
  },
  formPlaceholder: {
    gap: 12,
    marginBottom: 24,
  },
  inputPlaceholder: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f9f9f9",
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#444444",
    marginBottom: 4,
  },
  inputTextPlaceholder: {
    fontSize: 14,
    color: "#999999",
  },
  actions: {
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
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
    fontSize: 16,
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  secondaryButtonText: {
    color: "#1e293b",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  loginLink: {
    color: "#000000",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderColor: "#cbd5e1",
    borderWidth: 1,
  },
  form: {
    gap: 12,
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: "#fca5a5",
  },
  errorText: {
    color: "#de2626",
  },
});
