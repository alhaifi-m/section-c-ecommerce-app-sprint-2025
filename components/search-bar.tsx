import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { SearchBarProps } from "@/types";

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  initialValue = "",
}) => {
  const [query, setQuery] = useState<string>(initialValue);

  // update local state when initialValue changes

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSearch = (): void => {
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleClear = (): void => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={query}
          onChangeText={(text: string) => {
            setQuery(text);
            if (text === "" && onSearch) {
              onSearch("");
            }
          }}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={22} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={handleSearch}
        style={styles.searchButton}
        disabled={!query.trim()}
      >
        <Ionicons name="arrow-forward" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 4,
  },
  searchButton: {
    backgroundColor: "#5B37B7",
    borderRadius: 8,
    marginLeft: 8,
    maxHeight: 48,
    maxWidth: 48,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5B3737",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
