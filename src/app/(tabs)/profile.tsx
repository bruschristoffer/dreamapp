import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { removeToken, showAlert } from "../services/api";

export default function ProfileScreen() {
  const handleLogout = async () => {
    try {
      await removeToken();
      router.replace("/(auth)/login");
    } catch {
      showAlert("Fel", "Kunde inte logga ut");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Min profil</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mitt konto</Text>
      </View>

      {/* Logga ut */}
      <View style={styles.actions}>
        <Pressable
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logga ut</Text>
        </Pressable>
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
