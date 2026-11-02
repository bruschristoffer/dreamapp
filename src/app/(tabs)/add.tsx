import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddBookScreen() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveBook = async () => {
    if (!title.trim()) {
      alert("Du måste ange en boktitel");
      return;
    }

    setIsSaving(true);

    try {
      const token =
        Platform.OS === "web"
          ? sessionStorage.getItem("token")
          : await SecureStore.getItemAsync("token");

      if (!token) {
        alert("Du måste logga in först");
        return;
      }

      const response = await fetch("https://dreamapp-y1lt.onrender.com/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Kunde inte spara boken");
        return;
      }

      alert("Boken har sparats!");
      router.replace("/(tabs)");
    } catch (error) {
      alert("Kunde inte ansluta till servern");
    } finally {
      setIsSaving(false);
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
            style={styles.inputBox}
            placeholder="Ange boktitel"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Författare</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Ange författarens namn"
            value={author}
            onChangeText={setAuthor}
          />
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

      <View style={styles.actions}>
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={handleSaveBook}
          disabled={isSaving}
        >
          <Text style={styles.primaryButtonText}>
            {isSaving ? "Sparar..." : "Spara bok"}
          </Text>
        </Pressable>

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
