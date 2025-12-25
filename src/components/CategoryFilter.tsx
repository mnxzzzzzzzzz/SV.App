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
    fontFamily: "Helvetica",
  },
  dialContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  gridWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },
  categoryButton: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: "#101534",
    borderWidth: 2,
    borderColor: "#2C3158",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    transition: "all 200ms ease",
  },
  categoryButtonSelected: {
    backgroundColor: "#2962FF",
    borderColor: "#2962FF",
    shadowColor: "#2962FF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  categoryContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryText: {
    fontSize: 11,
    color: "#B0B3C7",
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Helvetica",
    letterSpacing: 0.3,
  },
  categoryTextSelected: {
    color: "#FFFFFF",
  },
});
