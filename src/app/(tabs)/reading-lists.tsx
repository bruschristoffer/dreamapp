import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ReadingListsScreen() {
  const [lists, setLists] = useState<string[]>([]);
  const [listName, setListName] = useState("");

  const handleAddList = () => {
    const name = listName.trim();

    if (!name) return;

    setLists((previousLists) => [...previousLists, name]);
    setListName("");
  };

  const handleDeleteList = (indexToDelete: number) => {
    setLists((previousLists) =>
      previousLists.filter((_, index) => index !== indexToDelete),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mina läslistor</Text>
      <Text style={styles.subtitle}>
        Skapa och organisera dina egna läslistor.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Namn på läslistan</Text>

        <TextInput
          style={styles.input}
          placeholder="T.ex. Sommarens böcker"
          value={listName}
          onChangeText={setListName}
        />

        <Pressable style={styles.button} onPress={handleAddList}>
          <Text style={styles.buttonText}>Skapa läslista</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Dina läslistor</Text>

      <FlatList
        data={lists}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listCard}>
            <Link
              href={{
                pathname: "/list/[id]",
                params: {
                  id: index.toString(),
                  name: item,
                },
              }}
              asChild
            >
              <Pressable style={styles.listLink}>
                <Text style={styles.listName}>{item}</Text>
                <Ionicons name="chevron-forward" size={20} color="#64748b" />
              </Pressable>
            </Link>
            <Pressable onPress={() => handleDeleteList(index)}>
              <Ionicons name="trash-outline" size={22} color="#ef4444" />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Du har inga läslistor ännu.</Text>
        }
      />
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 24,
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: "#0f172a",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 12,
  },
  listCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
  listLink: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 16,
  },
  emptyText: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 20,
  },
});
