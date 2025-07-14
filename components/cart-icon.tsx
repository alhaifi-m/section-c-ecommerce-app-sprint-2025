import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { CartIconProps } from "@/types";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useCart } from '@/context/cart-context';


const CartIcon = ({ color ="#333", size = 24 }: CartIconProps) => {
const router = useRouter();
const { getItemCount } = useCart();
const itemCount = getItemCount();


  return (
    <TouchableOpacity style={styles.container} onPress={ () => router.push('/cart' as any) }>
        <Ionicons name="cart-outline" size={size} color={color} />
     {itemCount > 0 && (
        <View style={styles.badge}>
            <Text style={styles.badgeText}>{itemCount > 99 ? "99+" : itemCount}</Text>

        </View>
     )}
    </TouchableOpacity>
  )
}

export default CartIcon

const styles = StyleSheet.create({
    container: {
        padding: 8,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: "#ff4d4d",
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: 'bold',
        paddingHorizontal: 4,
    },
})