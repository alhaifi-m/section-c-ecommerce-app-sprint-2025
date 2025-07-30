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
    const parsedInitialData : Product | null = initialData ? JSON.parse(initialData) : null;

    const [product, setProduct] = useState<Product | null>(parsedInitialData);
    const [loading, setLoading] = useState(!parsedInitialData);
    const [ quantity, setQuantity] = useState(1);

    useEffect(()=>{
        const loadProduct = async (): Promise<void> => {
            if(!product && id){
                try {
                    setLoading(true)
                    const productData = await fetchProductById(id);
                    setProduct(productData);
                    if(productData){
                        router.setParams({title: productData.title});
                    }
                } catch (error) {
                    console.error("Error loading product:", error);
                } finally {
                    setLoading(false);
                }
            }
        }
    }, [])
    
  return (
    <View>
      <Text>Product Detail</Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
