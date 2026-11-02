import { router } from "expo-router";
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
import { apiRequest } from "../services/api";

export default function AddBookScreen() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Vill läsa");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !author.trim()) {
      Alert.alert("validering", "ange både titel och författare.");
      return;
    }

    try {
      setSaving(true);
      await apiRequest("/books", {
        method: "POST",
        body: JSON.stringify({ title, author, status }),
      });

      setTitle("");
      setAuthor("");
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("fel", err.message || "Kunde inte spara");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lägg till bok</Text>
        <Text style={styles.subtitle}>
          Fyll i uppgifter för att spara en ny bok i din lista.
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Titel</Text>
          <TextInput
            style={styles.input}
            placeholder="T.ex. Dragon ball Z buu saga"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Författare</Text>
          <TextInput
            style={styles.input}
            placeholder="T.ex. Aniara"
            value={author}
            onChangeText={setAuthor}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lässtatus</Text>
          <View style={styles.statusOptions}>
            {["Vill läsa", "läser", "läst"].map((item) => (
              <Pressable
                key={item}
                onPress={() => setStatus(item)}
                style={[
                  styles.statusBadge,
                  status === item && styles.statusBadgeActive,
                ]}
              >
                <Text
                  style={
                    status === item
                      ? styles.statusTextActive
                      : styles.statusText
                  }
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.primaryButtonText}>Spara bok</Text>
          )}
        </Pressable>

        <Pressable
          style={[styles.button, styles.secondaryButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.secondaryButtonText}>Avbryt</Text>
        </Pressable>
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
  input: { borderWidth: 1, borderColor: "#cbd5e1" },
});
