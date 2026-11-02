import { Link, router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Book = {
  id: number;
  title: string;
  author: string;
  is_read: boolean;
};
const API_URL = "https://dreamapp-y1lt.onrender.com";
async function getToken() {
  return Platform.OS === "web"
    ? sessionStorage.getItem("token")
    : await SecureStore.getItemAsync("token");
}

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [status, setStatus] = useState("Inte läst");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const [savedBook, setSavedBook] = useState({
    title: "",
    author: "",
    status: "Inte läst",
  });

  useEffect(() => {
    let active = true;

    const fetchBook = async () => {
      setIsLoading(true);
      setError("");

      try {
        const token = await getToken();

        if (!token) {
          throw new Error("Du måste logga in först");
        }

        const response = await fetch(`${API_URL}/books`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Kunde inte hämta boken");
        }

        const books: Book[] = await response.json();
        const book = books.find((item) => String(item.id) === id);

        if (!book) {
          throw new Error("Boken hittades inte");
        }

        if (active) {
          const bookStatus = book.is_read ? "Läst" : "Inte läst";
          setTitle(book.title);
          setAuthor(book.author);
          setStatus(bookStatus);

          setSavedBook({
            title: book.title,
            author: book.author,
            status: bookStatus,
          });
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Något gick fel");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    fetchBook();

    return () => {
      active = false;
    };
  }, [id]);
  const handleCancel = () => {
    setTitle(savedBook.title);
    setAuthor(savedBook.author);
    setStatus(savedBook.status);
    setIsEditing(false);
    setError("");
  };
  const handleSave = async () => {
    if (!title.trim()) {
      setError("Du måste ange en boktitel");
      return;
    }

    if (!id) {
      setError("Bokens ID saknas");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = await getToken();

      if (!token) {
        throw new Error("Du måste logga in först");
      }

      const response = await fetch(`${API_URL}/books/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
          is_read: status === "Läst",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Kunde inte uppdatera boken");
      }

      const updatedStatus = data.is_read ? "Läst" : "Inte läst";

      setTitle(data.title);
      setAuthor(data.author);
      setStatus(updatedStatus);

      setSavedBook({
        title: data.title,
        author: data.author,
        status: updatedStatus,
      });

      setIsEditing(false);
      setSuccess("Boken har uppdaterats!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kunde inte spara ändringarna",
      );
    } finally {
      setIsSaving(false);
    }
  };
  const handleDelete = async () => {
    const deleteBook = async () => {
      try {
        const token = await getToken();

        if (!token) {
          throw new Error("Du måste logga in först");
        }

        const response = await fetch(`${API_URL}/books/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Kunde inte ta bort boken");
        }

        router.replace("/(tabs)");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Något gick fel");
      }
    };

    if (Platform.OS === "web") {
      if (window.confirm("Är du säker på att du vill ta bort boken?")) {
        await deleteBook();
      }
    } else {
      Alert.alert("Ta bort bok", "Är du säker på att du vill ta bort boken?", [
        { text: "Avbryt", style: "cancel" },
        {
          text: "Ta bort",
          style: "destructive",
          onPress: () => {
            void deleteBook();
          },
        },
      ]);
    }
  };
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text>Laddar bok...</Text>
      </View>
    );
  }

  if (error && !savedBook.title) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Link href="/(tabs)">← Tillbaka till Mina böcker</Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* <Text style={styles.badge}>Bok ID: {id ?? "okänt"}</Text> */}
          {isEditing ? (
            <>
              <Text style={styles.inputLabel}>Titel</Text>
              <TextInput
                style={styles.editInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Ange boktitel"
              />

              <Text style={styles.inputLabel}>Författare</Text>
              <TextInput
                style={styles.editInput}
                value={author}
                onChangeText={setAuthor}
                placeholder="Ange författare"
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>{title}</Text>

              <Text style={styles.author}>{author}</Text>

              <Pressable
                style={styles.editButton}
                onPress={() => {
                  setError("");
                  setSuccess("");
                  setIsEditing(true);
                }}
              >
                <Text style={styles.editButtonText}>✏️ Redigera bok</Text>
              </Pressable>
            </>
          )}

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Nuvarande status:</Text>

            <Text style={styles.metaValue}>{status}</Text>
          </View>
        </View>

        {isEditing && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Uppdatera lässtatus</Text>

            <View style={styles.statusButtons}>
              {["Inte läst", "Läst"].map((option) => (
                <Pressable
                  key={option}
                  onPress={() => setStatus(option)}
                  style={[
                    styles.statusButton,
                    status === option && styles.statusButtonActive,
                  ]}
                >
                  <Text
                    style={
                      status === option
                        ? styles.statusButtonTextActive
                        : styles.statusButtonText
                    }
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {error !== "" && <Text style={styles.errorText}>{error}</Text>}

        {success !== "" && <Text style={styles.successText}>{success}</Text>}

        {isEditing && (
          <View style={styles.editActions}>
            <Pressable
              style={[styles.saveButton, isSaving && styles.disabledButton]}
              onPress={handleSave}
              disabled={isSaving}
            >
              <Text style={styles.saveButtonText}>
                {isSaving ? "Sparar..." : "Spara ändringar"}
              </Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={handleCancel}
              disabled={isSaving}
            >
              <Text style={styles.cancelButtonText}>Avbryt</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.actions}>
          <Pressable
            style={styles.deleteButtonPlaceholder}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>Ta bort bok</Text>
          </Pressable>

          <Link href="/(tabs)" style={styles.backLink}>
            <Text style={styles.backLinkText}>← Tillbaka till Mina böcker</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 20,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  metaLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e293b",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 10,
  },
  statusButtons: {
    flexDirection: "row",
    gap: 8,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  statusButtonActive: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  statusButtonText: {
    fontSize: 13,
    color: "#475569",
  },
  statusButtonTextActive: {
    fontSize: 13,
    color: "#2563eb",
    fontWeight: "600",
  },
  actions: {
    gap: 12,
    marginTop: "auto",
  },
  deleteButtonPlaceholder: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fecaca",
    backgroundColor: "#fff1f2",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#e11d48",
    fontWeight: "600",
    fontSize: 14,
  },
  backLink: {
    paddingVertical: 12,
    textAlign: "center",
  },
  backLinkText: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  scrollContent: {
    flexGrow: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 6,
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: "#eff6ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  editButtonText: {
    color: "#2563eb",
    fontWeight: "600",
  },
  editActions: {
    gap: 12,
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelButton: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#475569",
    fontWeight: "600",
  },
  errorText: {
    color: "#dc2626",
    marginBottom: 12,
  },
  successText: {
    color: "#15803d",
    marginBottom: 12,
    fontWeight: "600",
  },
});
