import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type TopPick = {
  id: string;
  name: string;
  offer: string;
  icon: string;
};

type TopPicksCarouselProps = {
  items: TopPick[];
  onPress: (item: TopPick) => void;
};

export default function TopPicksCarousel({
  items,
  onPress,
}: TopPicksCarouselProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>💡 SMART SAVE FOR YOU</Text>
      <Text style={styles.sectionSubtitle}>
        Top picks based on your usage
      </Text>

      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.carouselContent}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => onPress(item)}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.cardTitle}>TOP</Text>
              <Text style={styles.cardSubtitle}>PICK</Text>
            </View>
            <Text style={styles.cardName}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#B0B3C7",
    marginBottom: 12,
  },
  carouselContent: {
    paddingRight: 16,
  },
  card: {
    width: 120,
    backgroundColor: "#101534",
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 28,
    marginBottom: 8,
  },
  badgeContainer: {
    backgroundColor: "#FFB800",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
  },
  cardName: {
    fontSize: 10,
    color: "#B0B3C7",
    marginTop: 8,
    textAlign: "center",
  },
});
