import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegister = () => {
  if (!name.trim() || !email.trim() || !password || !confirmPassword) {
    alert("Fyll i alla fält");
    return;
  }

  if (password !== confirmPassword) {
    alert("Lösenorden matchar inte");
    return;
  }

  alert("Formuläret är korrekt ifyllt");
};
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skapa konto</Text>
      <Text style={styles.subtitle}>Börja hålla koll på dina böcker</Text>

      <View style={styles.formPlaceholder}>
  <Text>Namn</Text>
  <TextInput
    style={styles.inputPlaceholder}
    placeholder="Skriv ditt namn"
    value={name}
    onChangeText={setName}
  />

  <Text>E-post</Text>
  <TextInput
    style={styles.inputPlaceholder}
    placeholder="Skriv din e-post"
    value={email}
    onChangeText={setEmail}
    autoCapitalize="none"
    keyboardType="email-address"
  />

  <Text>Lösenord</Text>
  <TextInput
    style={styles.inputPlaceholder}
    placeholder="Skriv lösenord"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
  />

  <Text>Bekräfta lösenord</Text>
  <TextInput
    style={styles.inputPlaceholder}
    placeholder="Upprepa lösenord"
    value={confirmPassword}
    onChangeText={setConfirmPassword}
    secureTextEntry
  />
</View>


      {/* Navigationsknappar / åtgärder */}
      <View style={styles.actions}>
        <Pressable
  style={[styles.button, styles.primaryButton]}
  onPress={handleRegister}
>
  <Text style={styles.primaryButtonText}>Skapa konto</Text>
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
});
