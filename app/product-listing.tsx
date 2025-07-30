import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  type ListRenderItem,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import ProductCard from "@/components/product-card";
import SearchBar from "@/components/search-bar";
import CartIcon from "@/components/cart-icon";
import { searchProducts } from "@/api/product-service";
import { Product } from "@/types";
import { useEffect, useState } from "react";

const ProductListingScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams() as Record<string, string | undefined>;
  const { query } = params;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = async (searchQuery?: string): Promise<void> => {
    try {
      setLoading(true);
      const queryToUse = searchQuery !== undefined ? searchQuery : query || "";
      const results = await searchProducts(queryToUse);
      setProducts(results);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  // Load products when the component mount or the query changes
  useEffect(() => {
    loadProducts(query);
  }, [query]);

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      product={item}
      style={styles.productCard}
      onPress={() => {
        router.push({
          pathname: `/product/${item.id}`,
          params: { initialData: JSON.stringify(item) },
        });
      }}
    />
  );

  const handleSearch = (newQuery: string): void =>{
    router.setParams({ query: newQuery });
    loadProducts(newQuery);
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: query ? `Search results for "${query}"` : "Products",
          headerRight: () => <CartIcon />,
        }}
      />
      <SafeAreaView style={styles.container}>
        <SearchBar placeholder={`Search in ${query || "Products"}`} onSearch={handleSearch} initialValue={query} />
        { loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5B37B7" />
          </View>
        ):(
          <>
          { products.length > 0 ? (
            <FlatList 
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.productList}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            ListHeaderComponent={
              <Text style={styles.resultsText}>
                {products.length} {products.length === 1 ? "product" : "products"} found
              </Text>
            }
            />
          ):(
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
              <Text style={styles.emptySubText}>Try a different search term</Text>
            </View>
          )}
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default ProductListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f8f8f8",
  },
  productCard: {
    flex: 1,
    margin: 8,
    maxWidth: "50%",
  },
  productList: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultsText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
});
