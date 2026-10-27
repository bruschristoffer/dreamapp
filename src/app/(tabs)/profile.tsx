import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inställningar & Profil</Text>
        <Text style={styles.subtitle}>Hantera ditt konto och preferenser</Text>
      </View>

      {/* Användarinfo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Inloggad användare</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Namn:</Text>
          <Text style={styles.infoValue}>Demo Användare</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>E-post:</Text>
          <Text style={styles.infoValue}>anvandare@example.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Sparade böcker:</Text>
          <Text style={styles.infoValue}>1 st</Text>
        </View>
      </View>

      {/* Inställnings-placeholders */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Appinställningar</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Aviseringar</Text>
          <Text style={styles.settingPlaceholder}>[Placeholder: På]</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Mörkt läge</Text>
          <Text style={styles.settingPlaceholder}>[Placeholder: Av]</Text>
        </View>
      </View>

      {/* Logga ut */}
      <View style={styles.actions}>
        <Link href="/(auth)/login" style={[styles.button, styles.logoutButton]}>
          <Text style={styles.logoutButtonText}>Logga ut</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    marginBottom: 20,
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
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 16,
    gap: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0f172a",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  settingLabel: {
    fontSize: 14,
    color: "#334155",
  },
  settingPlaceholder: {
    fontSize: 13,
    color: "#94a3b8",
  },
  actions: {
    marginTop: 8,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    textAlign: "center",
    overflow: "hidden",
  },
  logoutButton: {
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  logoutButtonText: {
    color: "#dc2626",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
});
