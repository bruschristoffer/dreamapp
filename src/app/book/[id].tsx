import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      {/* Bokinformation */}
      <View style={styles.card}>
        <Text style={styles.badge}>Bok ID: {id ?? "okänt"}</Text>
        <Text style={styles.title}>Aniara</Text>
        <Text style={styles.author}>Harry Martinson</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Nuvarande status:</Text>
          <Text style={styles.metaValue}>Läser just nu</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Antal sidor:</Text>
          <Text style={styles.metaValue}>[Placeholder: 220 sidor]</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Betyg:</Text>
          <Text style={styles.metaValue}>[Placeholder: ★★★★☆ 4/5]</Text>
        </View>
      </View>

      {/* Uppdatera status (CRUD: Update) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Uppdatera lässtatus</Text>
        <View style={styles.statusButtons}>
          <View style={styles.statusButton}>
            <Text style={styles.statusButtonText}>Vill läsa</Text>
          </View>
          <View style={[styles.statusButton, styles.statusButtonActive]}>
            <Text style={styles.statusButtonTextActive}>Läser</Text>
          </View>
          <View style={styles.statusButton}>
            <Text style={styles.statusButtonText}>Läst</Text>
          </View>
        </View>
      </View>

      {/* Åtgärder: Ta bort bok & Navigering (CRUD: Delete) */}
      <View style={styles.actions}>
        <View style={styles.deleteButtonPlaceholder}>
          <Text style={styles.deleteButtonText}>Ta bort bok (Placeholder)</Text>
        </View>

        <Link href="/(tabs)" style={styles.backLink}>
          <Text style={styles.backLinkText}>← Tillbaka till Mina böcker</Text>
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
});
