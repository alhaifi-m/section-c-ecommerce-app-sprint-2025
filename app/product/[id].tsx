import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { fetchProductById } from "@/api/product-service";
import { useCart } from "@/context/cart-context";
import CartIcon from "@/components/cart-icon";
import { Product } from "@/types";
import { useEffect, useState } from "react";

const { width } = Dimensions.get("window");

const ProductDetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams() as Record<string, string | undefined>;
  const { id, initialData } = params;
  const { addItem } = useCart();

  // try to parse initial data if available
  const parsedInitialData: Product | null = initialData
    ? JSON.parse(initialData)
    : null;

  const [product, setProduct] = useState<Product | null>(parsedInitialData);
  const [loading, setLoading] = useState(!parsedInitialData);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async (): Promise<void> => {
      if (!product && id) {
        try {
          setLoading(true);
          const productData = await fetchProductById(id);
          setProduct(productData);
          if (productData) {
            router.setParams({ title: productData.title });
          }
        } catch (error) {
          console.error("Error loading product:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadProduct();
  }, [id, product, router]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      Alert.alert("Success", `${product.title} has been added to your cart.`);
    }
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="##5B37B7" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No product found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#5B37B7" />
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          title:
            product.title.length > 20
              ? product.title.substring(0, 20) + "..."
              : product.title,
          headerRight: () => <CartIcon />,
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
              </Text>
            </View>
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                {[...Array(5)].map((_, index) => (
                  <Ionicons
                    key={index}
                    name={
                      index < Math.floor(product.rating?.rate || 0)
                        ? "star"
                        : "star-outline"
                    }
                    size={20}
                    color="#FFD700"
                    style={{ marginRight: 2 }}
                  />
                ))}
              </View>
            </View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>

            <View style={styles.divider} />
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>

            <View style={styles.QuantityContainer}>
              <Text style={styles.QuantityTitle}>Quantity</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity onPress={decreaseQuantity}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="#5B37B7"
                  />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity}>
                  <Ionicons
                    name="add-circle-outline"
                    size={24}
                    color="#5B37B7"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.wishlistButton}>
            <Ionicons name="heart-outline" size={24} color="333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Ionicons name="cart-outline" size={24} color="#fff" />
            <Text style={styles.addToCartButtonText}>
              Add to Cart -${(product.price * quantity).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: "#5B37B7",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    backgroundColor: "#f0f0f0",
    width: width,
    height: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
  },
  detailsContainer: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "#555",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stars: {
    flexDirection: "row",
    marginRight: 8,
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5B37B7",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  QuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  QuantityTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  quantityText: {
    fontSize: 16,
    color: "#333",
    marginHorizontal: 12,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
    wishlistButton: {
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 8,
        marginRight: 16,
    },
    addToCartButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5B37B7",
        borderRadius: 8,
        height: 50,
    },
    addToCartButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
});
