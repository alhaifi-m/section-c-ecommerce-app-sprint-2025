import { StyleSheet, Text, View, FlatList, type ListRenderItem } from 'react-native'
import { useRouter } from 'expo-router';
import ProductCard from './product-card';
import { ProductCarouselProps, Product } from '@/types';

const ProductCarousel = ({title, products, style} : ProductCarouselProps) => {
    const router = useRouter();

    if(!products || products.length === 0) {
        return null; // or return a placeholder component
    }

    const handleProductPress = (product: Product) => {
        // This is a placeholder for navigation logic
        // We will come back when we implement product details screen
        console.log("Product pressed:", product);
    }

    const renderItem: ListRenderItem<Product> = ({ item }) => (
        <ProductCard product={item} onPress={() => handleProductPress(item)} />
    );
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <FlatList 
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

export default ProductCarousel

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        paddingHorizontal: 16,
        color: "#333",
    },
    listContainer: {
        paddingHorizontal: 8,
        paddingBottom: 8,
    },
})