import { Pressable, StyleSheet, Text, View } from "react-native";

type Category = {
  id: string;
  name: string;
  emoji: string;
};

type CategoryFilterProps = {
  categories: Category[];
  selected: string[];
  onSelect: (categoryId: string) => void;
};

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>🏷️ BROWSE CATEGORIES</Text>

      <View style={styles.dialContainer}>
        <View style={styles.gridWrapper}>
          {categories.map((category) => {
            const isSelected = selected.includes(category.id);
            return (
              <Pressable
                key={category.id}
                style={[
                  styles.categoryButton,
                  isSelected && styles.categoryButtonSelected,
                ]}
                onPress={() => onSelect(category.id)}
              >
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && styles.categoryTextSelected,
                    ]}
                  >
                    {category.name}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  dialContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  gridWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  categoryButton: {
    width: "31.33%",
    aspectRatio: 1,
    margin: "1%",
    borderRadius: 18,
    backgroundColor: "#101534",
    borderWidth: 2,
    borderColor: "#2C3158",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  categoryButtonSelected: {
    backgroundColor: "#2962FF",
    borderColor: "#2962FF",
    shadowColor: "#2962FF",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  categoryContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  categoryEmoji: {
    fontSize: 36,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 12,
    color: "#B0B3C7",
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.2,
  },
  categoryTextSelected: {
    color: "#FFFFFF",
  },
});
