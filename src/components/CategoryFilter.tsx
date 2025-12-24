import { ScrollView, Pressable, StyleSheet, Text, View } from "react-native";

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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        {categories.map((category) => {
          const isSelected = selected.includes(category.id);
          return (
            <Pressable
              key={category.id}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
              ]}
              onPress={() => onSelect(category.id)}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}
              >
                {category.emoji} {category.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  chipsContainer: {
    paddingRight: 16,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2C3158",
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: "#2962FF",
    borderColor: "#2962FF",
  },
  chipText: {
    fontSize: 12,
    color: "#B0B3C7",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#FFFFFF",
  },
});
