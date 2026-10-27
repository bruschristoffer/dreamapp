import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function MyBooksScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mina böcker</Text>
        <Text style={styles.subtitle}>
          Här visas alla böcker i din personliga läslista.
        </Text>
      </View>

      {/* Placeholder för boklista */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Sparade böcker</Text>

        {/* Exempelbok för att demonstrera navigering till detaljsidan */}
        <View style={styles.bookCard}>
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>Exempelbok: Aniara</Text>
            <Text style={styles.bookAuthor}>Harry Martinson</Text>
            <Text style={styles.bookStatus}>Status: Läser just nu</Text>
          </View>
          <Link href="/book/1" style={styles.detailLink}>
            <Text style={styles.detailLinkText}>Visa detaljer ›</Text>
          </Link>
        </View>

        {/* Placeholder för tom lista / info */}
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            [Placeholder: Inga fler sparade böcker i listan]
          </Text>
          <Link href="/(tabs)/add" style={styles.addLink}>
            <Text style={styles.addLinkText}>+ Lägg till en ny bok</Text>
          </Link>
        </View>
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
  listSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 4,
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
    marginBottom: 2,
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
  detailLink: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#eff6ff",
    borderRadius: 6,
  },
  detailLinkText: {
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
    marginTop: 8,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
  addLink: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#2563eb",
    borderRadius: 6,
  },
  addLinkText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 13,
  },
});
