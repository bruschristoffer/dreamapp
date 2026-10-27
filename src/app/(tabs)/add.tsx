import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function AddBookScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lägg till bok</Text>
        <Text style={styles.subtitle}>
          Fyll i uppgifter för att spara en ny bok i din lista.
        </Text>
      </View>

      {/* Formulär-placeholders */}
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Titel</Text>
          <View style={styles.inputBox}>
            <Text style={styles.placeholderText}>[Inmatningsfält: Boktitel]</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Författare</Text>
          <View style={styles.inputBox}>
            <Text style={styles.placeholderText}>[Inmatningsfält: Författarens namn]</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lässtatus</Text>
          <View style={styles.statusOptions}>
            <View style={[styles.statusBadge, styles.statusBadgeActive]}>
              <Text style={styles.statusTextActive}>Vill läsa</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Läser</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Läst</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Knappar och navigering */}
      <View style={styles.actions}>
        <Link href="/(tabs)" style={[styles.button, styles.primaryButton]}>
          <Text style={styles.primaryButtonText}>Spara bok</Text>
        </Link>

        <Link href="/(tabs)" style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.secondaryButtonText}>Avbryt</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  form: {
    gap: 16,
    marginBottom: 28,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },
  inputBox: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
  },
  placeholderText: {
    fontSize: 14,
    color: "#94a3b8",
  },
  statusOptions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
  },
  statusBadgeActive: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  statusText: {
    fontSize: 13,
    color: "#64748b",
  },
  statusTextActive: {
    fontSize: 13,
    color: "#2563eb",
    fontWeight: "600",
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
    color: "#475569",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
});
