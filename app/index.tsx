import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "./product-service";
import type { Product } from "@/types";

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const featuredProducts = await fetchFeaturedProducts();
      setProducts(featuredProducts);
    };

    loadProducts();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      { products.map((product) => (
        <View key={product.id} style={{ margin: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{product.title}</Text>
          <Text style={{ color: "gray" }}>{product.category}</Text>
          <Text>{product.description}</Text>
        </View>
      ))}
    </View>
  );
}
