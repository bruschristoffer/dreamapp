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
import {
  apiRequest,
  BOOK_STATUSES,
  BookStatus,
  getToken,
  showAlert,
} from "../services/api";

export default function AddBookScreen() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<BookStatus>("Vill läsa");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveBook = async () => {
    if (!title.trim() || !author.trim()) {
      showAlert("Validering", "Du måste ange både boktitel och författare.");
      return;
    }

    const token = await getToken();
    if (!token) {
      showAlert("Fel", "Du måste logga in först.");
      return;
    }

    setIsSaving(true);

    try {
      await apiRequest("/books", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
          status,
          is_read: status === "Läst",
        }),
      });

      setTitle("");
      setAuthor("");
      showAlert("Klart", "Boken har sparats!");
      router.replace("/(tabs)");
    } catch (err: any) {
      showAlert("Fel", err?.message || "Kunde inte spara boken");
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
            placeholder="Ange boktitel (t.ex. Aniara)"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Författare</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Ange författarens namn (t.ex. Harry Martinson)"
            value={author}
            onChangeText={setAuthor}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Lässtatus</Text>
          <View style={styles.statusOptions}>
            {BOOK_STATUSES.map((item) => (
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
          onPress={handleSaveBook}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.primaryButtonText}>Spara bok</Text>
          )}
        </Pressable>

        <Link href="/(tabs)" asChild>
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>Avbryt</Text>
          </Pressable>
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
    fontSize: 15,
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
