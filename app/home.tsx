import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MerchantCard from "../src/components/MerchantCard";
import { merchants } from "../src/data/merchants/mock";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby student offers</Text>

      <FlatList
        data={merchants}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <MerchantCard
            merchant={item}
            onPress={() => router.push("/qr")}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080C1F",
    padding: 16,
  },
  title: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 16,
  },
});
