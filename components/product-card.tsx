import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { ProductCardProps } from '@/types'

const ProductCard = ({ product, style, onPress }: ProductCardProps) => {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={() => onPress && onPress()} activeOpacity={0.7}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode='contain'/>
        <View style={styles.content}>
            <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
            <View style={styles.priceRow}>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <View style={styles.ratingContainer}>
                    {product.rating && (
                        <Text style={styles.rating}>
                           ⭐ {product.rating.rate || "4.0"} ({product.rating.count})
                        </Text>
                    )}
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        margin: 8,
        maxWidth: 160,
        overflow: "hidden"
    },
    image: {
        height: 120,
        width: "100%",
        backgroundColor: "#f0f0f0",
    },
    content: {
        padding: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#222",
    },
    ratingContainer: {
        backgroundColor: "#f8f8f8",
        borderRadius: 4,
        padding: 4,
    },
    rating: {
        fontSize: 12,
        color: "#666",
    }
})