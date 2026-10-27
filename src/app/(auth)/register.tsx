import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skapa konto</Text>
      <Text style={styles.subtitle}>Börja hålla koll på dina böcker</Text>

      {/* Placeholders för inmatningsfält */}
      <View style={styles.formPlaceholder}>
        <View style={styles.inputPlaceholder}>
          <Text style={styles.inputLabel}>Namn</Text>
          <Text style={styles.inputTextPlaceholder}>[Inmatningsfält: fullständigt namn]</Text>
        </View>

        <View style={styles.inputPlaceholder}>
          <Text style={styles.inputLabel}>E-post</Text>
          <Text style={styles.inputTextPlaceholder}>[Inmatningsfält: e-postadress]</Text>
        </View>

        <View style={styles.inputPlaceholder}>
          <Text style={styles.inputLabel}>Lösenord</Text>
          <Text style={styles.inputTextPlaceholder}>[Inmatningsfält: lösenord]</Text>
        </View>

        <View style={styles.inputPlaceholder}>
          <Text style={styles.inputLabel}>Bekräfta lösenord</Text>
          <Text style={styles.inputTextPlaceholder}>[Inmatningsfält: upprepa lösenord]</Text>
        </View>
      </View>

      {/* Navigationsknappar / åtgärder */}
      <View style={styles.actions}>
        <Link href="/(tabs)" style={[styles.button, styles.primaryButton]}>
          <Text style={styles.primaryButtonText}>Registrera & Logga in</Text>
        </Link>

        <Link href="/(auth)/login" style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.secondaryButtonText}>Har du redan ett konto? Logga in</Text>
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
    fontSize: 14,
    textAlign: "center",
  },
});
