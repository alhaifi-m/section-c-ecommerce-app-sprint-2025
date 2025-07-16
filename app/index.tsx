import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchAllCategories, fetchFeaturedProducts, fetchProductsByCategory } from "../api/product-service";
import CartIcon from "@/components/cart-icon";
import type { Product } from "@/types";
import { Stack } from "expo-router";
import SearchBar from "@/components/search-bar";
import ProductCarousel from "@/components/product-carousel";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const loadData = async () =>{
    try {
      setLoading(true);
      // Fetch featured products from the API
      const products = await fetchFeaturedProducts(10);
      setFeaturedProducts(products);

      // Fetch Categories from the API
      const categoriesData = await fetchAllCategories();
      setCategories(categoriesData);

      // Fetch products by category 
      if(categoriesData.length > 0) {
        const defaultCategory = categoriesData[0];
        const categoryProductData = await fetchProductsByCategory(defaultCategory);
        setCategoryProducts(categoryProductData)
        setSelectedCategory(defaultCategory);
      }

    } catch (error) {
      console.error("Error loading data:", error);
    }
  finally {
      setLoading(false);
    }
  }

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
        <SearchBar onSearch={(query) => console.log("Searching for:", query)} />
                <ProductCarousel
        title="Featured Products"
        products={featuredProducts}
        style={{ marginBottom: 16 }}
      />
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
})