import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  fetchAllCategories,
  fetchFeaturedProducts,
  fetchProductsByCategory,
} from "../api/product-service";
import CartIcon from "@/components/cart-icon";
import type { Product } from "@/types";
import { router, Stack } from "expo-router";
import SearchBar from "@/components/search-bar";
import ProductCarousel from "@/components/product-carousel";
import CategoryPills from "@/components/category-pills";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch featured products from the API
      const products = await fetchFeaturedProducts(10);
      setFeaturedProducts(products);

      // Fetch Categories from the API
      const categoriesData = await fetchAllCategories();
      setCategories(categoriesData);

      // Fetch products by category
      if (categoriesData.length > 0) {
        const defaultCategory = categoriesData[0];
        const categoryProductData = await fetchProductsByCategory(
          defaultCategory
        );
        setCategoryProducts(categoryProductData);
        setSelectedCategory(defaultCategory);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category: string | null) => {
    setSelectedCategory(category);
    if (!category) {
      // if All is selected, reset to featured products
      setCategoryProducts(featuredProducts);
      return;
    }
    try {
      const products = await fetchProductsByCategory(category);
      setCategoryProducts(products);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Stack.Screen
        name="Home"
        options={{
          headerTitle: "MY STORE",
          headerRight: () => <CartIcon />,
        }}
      />
      <SafeAreaView style={styles.container}>
        <SearchBar onSearch={(query) => {
          if(query.trim()){
            router.push({
              pathname: "/product-listing",
              params: { query },
            });
          }
        }} />
        <ProductCarousel
          title="Featured Products"
          products={featuredProducts}
          style={{ marginBottom: 16 }}
        />
        <View style={{ maxHeight: 80 }}>
        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        </View>

        <View style={styles.categoryProductsContainer}>
          {categoryProducts.length > 0 ? (
            <ProductCarousel
              title={selectedCategory ? `Products in ${selectedCategory}` : "All Products"}
              products={categoryProducts}
              style={{ marginBottom: 5 }}
            />
          ) : (
            <Text style={styles.noProductsText}>No products found</Text>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  categoryProductsContainer: {
    marginTop: 8,
    // maxHeight: 200,
  },
  noProductsText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },

});
