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
        <View style={styles.merchantInfo}>
          <Text style={styles.merchantName}>{merchant.name}</Text>
          <Text style={styles.distance}>[{merchant.distance}]</Text>
        </View>
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
    marginBottom: 10,
  },
  merchantInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  merchantName: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    flex: 1,
  },
  distance: {
    fontSize: 12,
    color: "#B0B3C7",
  },
  offer: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
    marginBottom: 6,
  },
  rules: {
    fontSize: 12,
    color: "#8A8FB3",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2962FF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});
