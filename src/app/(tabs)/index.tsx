import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

//tillfälligt
const books = [
  {
    id: "1",
    title: "Aniara",
    author: "Harry Martinson",
    status: "Läser",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    status: "Vill läsa",
  },
  {
    id: "3",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    status: "Läst",
  },
];

export default function MyBooksScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Mina böcker</Text>
          <Text style={styles.subtitle}>
            Här visas alla böcker i din personliga läslista.
          </Text>
        </View>
        <Link href="/reading-lists" asChild>
          <Pressable style={styles.readingListButton}>
            <Ionicons name="list-outline" size={18} color="#2563eb" />
            <Text style={styles.readingListButtonText}>Läslistor</Text>
          </Pressable>
        </Link>
        <Link href="/(tabs)/profile" asChild>
          <Pressable style={styles.profileButton}>
            <Ionicons name="person-outline" size={22} color="#334155" />
          </Pressable>
        </Link>
      </View>

      <Text style={styles.sectionTitle}>Sparade böcker</Text>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookList}
        renderItem={({ item }) => (
          <View style={styles.bookCard}>
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>
              <Text style={styles.bookStatus}>Status: {item.status}</Text>
            </View>
            <Link
              href={{
                pathname: "/book/[id]",
                params: { id: item.id },
              }}
              asChild
            >
              <Pressable style={styles.detailButton}>
                <Text style={styles.detailButtonText}>Visa detaljer ›</Text>
              </Pressable>
            </Link>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Du har inga sparade böcker ännu.
            </Text>
          </View>
        }
      />

      <Link href="/(tabs)/add" asChild>
        <Pressable style={styles.addButton}>
          <Ionicons name="add" size={20} color="#ffffff" />
          <Text style={styles.addButtonText}>Lägg till en ny bok</Text>
        </Pressable>
      </Link>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerText: {
    flex: 1,
    marginRight: 12,
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
  profileButton: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 12,
  },
  bookList: {
    gap: 12,
    paddingBottom: 20,
    flexGrow: 1,
  },
  bookCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookInfo: {
    flex: 1,
    marginRight: 12,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 4,
  },
  bookStatus: {
    fontSize: 12,
    color: "#2563eb",
    fontWeight: "500",
  },
  detailButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#eff6ff",
    borderRadius: 6,
  },
  detailButtonText: {
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 13,
  },
  emptyState: {
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
  readingListButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  readingListButtonText: {
    color: "#2563eb",
    fontSize: 13,
    fontWeight: "600",
  },
});
