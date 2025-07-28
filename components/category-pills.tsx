import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { CategoryPillsProps } from "@/types";

const CategoryPills = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryPillsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[styles.pill, !selectedCategory && styles.selectedPill]}
        onPress={() => onSelectCategory && onSelectCategory("")}
      >
        <Text
          style={[
            styles.pillText,
            !selectedCategory && styles.selectedPillText,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>

      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.pill,
            selectedCategory === category && styles.selectedPill,
          ]}
          onPress={() => onSelectCategory && onSelectCategory(category)}
        >
          <Text
            style={[
              styles.pillText,
              selectedCategory === category && styles.selectedPillText,
            ]}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryPills;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    maxHeight: 65,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  selectedPill: {
    backgroundColor: "#5b37b7",
  },
  pillText: {
    fontSize: 14,
    color: "#666",
  },
  selectedPillText: {
    color: "#fff",
    fontWeight: "500",
  },
});
