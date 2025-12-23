import { Pressable, StyleSheet, Text, View } from "react-native";
import { Merchant } from "../data/merchants/mock";

type Props = {
  merchant: Merchant;
  onPress: () => void;
};

export default function MerchantCard({ merchant, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{merchant.name}</Text>
        <Text style={styles.distance}>{merchant.distance}</Text>
      </View>

      <Text style={styles.offer}>{merchant.offer}</Text>
      <Text style={styles.rules}>{merchant.rules}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#101534",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  distance: {
    fontSize: 12,
    color: "#B0B3C7",
  },
  offer: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  rules: {
    fontSize: 12,
    color: "#8A8FB3",
  },
});
