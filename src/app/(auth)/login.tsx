import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logga in</Text>
      <Text style={styles.subtitle}>Välkommen till Boklista</Text>

      {/* Placeholders för inmatningsfält */}
      <View style={styles.formPlaceholder}>
        <View style={styles.inputPlaceholder}>
          <Text style={styles.inputLabel}>Användarnamn / E-post</Text>
          <Text style={styles.inputTextPlaceholder}>[Inmatningsfält: e-postadress]</Text>
        </View>

        <View style={styles.inputPlaceholder}>
          <Text style={styles.inputLabel}>Lösenord</Text>
          <Text style={styles.inputTextPlaceholder}>[Inmatningsfält: lösenord]</Text>
        </View>
      </View>

      {/* Navigationsknappar / åtgärder */}
      <View style={styles.actions}>
        <Link href="/(tabs)" style={[styles.button, styles.primaryButton]}>
          <Text style={styles.primaryButtonText}>Logga in</Text>
        </Link>

        <Link href="/(auth)/register" style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.secondaryButtonText}>Skapa konto</Text>
        </Link>

        <Link href="/(tabs)" style={styles.linkText}>
          <Text style={styles.link}>Hoppa över / Fortsätt till appen</Text>
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
    marginBottom: 32,
  },
  formPlaceholder: {
    gap: 16,
    marginBottom: 24,
  },
  inputPlaceholder: {
    padding: 14,
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
    alignItems: "stretch",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
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
    fontSize: 16,
    textAlign: "center",
  },
  linkText: {
    marginTop: 8,
    textAlign: "center",
  },
  link: {
    color: "#2563eb",
    fontSize: 14,
    textAlign: "center",
  },
});
