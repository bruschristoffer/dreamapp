import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const books = [
  { id: "1", title: "Aniara", author: "Harry Martinson" },
  { id: "2", title: "Atomic Habits", author: "James Clear" },
  {
    id: "3",
    title: "The Psychology of Money",
    author: "Morgan Housel",
  },
];

export default function ReadingListDetailsScreen() {
  const { id, name } = useLocalSearchParams<{
    id: string;
    name?: string;
  }>();

  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [showBookPicker, setShowBookPicker] = useState(false);

  const handleAddBook = (bookId: string) => {
    setSelectedBooks((previous) =>
      previous.includes(bookId) ? previous : [...previous, bookId],
    );

    setShowBookPicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name ?? "Min läslista"}</Text>

      <Text style={styles.subtitle}>
        Här kommer böckerna i din läslista att visas.
      </Text>

      <View style={styles.card}>
        {selectedBooks.length === 0 ? (
          <Text style={styles.emptyText}>
            Du har inte lagt till några böcker ännu.
          </Text>
        ) : (
          books
            .filter((book) => selectedBooks.includes(book.id))
            .map((book) => (
              <View key={book.id} style={styles.bookRow}>
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>{book.author}</Text>
                </View>

                <Pressable
                  onPress={() =>
                    setSelectedBooks((previous) =>
                      previous.filter((id) => id !== book.id),
                    )
                  }
                >
                  <Ionicons name="trash-outline" size={22} color="#ef4444" />
                </Pressable>
              </View>
            ))
        )}
      </View>

      <Pressable
        style={styles.button}
        onPress={() => setShowBookPicker(!showBookPicker)}
      >
        <Ionicons name="add" size={20} color="#ffffff" />
        <Text style={styles.buttonText}>Lägg till bok</Text>
      </Pressable>

      {showBookPicker && (
        <View style={styles.card}>
          <Text style={styles.pickerTitle}>Välj en bok</Text>

          {books
            .filter((book) => !selectedBooks.includes(book.id))
            .map((book) => (
              <Pressable
                key={book.id}
                style={styles.bookOption}
                onPress={() => handleAddBook(book.id)}
              >
                <View>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>{book.author}</Text>
                </View>

                <Ionicons name="add-circle-outline" size={24} color="#2563eb" />
              </Pressable>
            ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  emptyText: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  bookRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  bookOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
});
