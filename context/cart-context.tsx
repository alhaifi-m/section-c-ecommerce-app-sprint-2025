import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import AsynStorage from "@react-native-async-storage/async-storage";
import { Product, CartItem, CartContextType, CartProviderProps } from "@/types";

// create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// provider component that wraps the app and provides the cart context

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Loading cart from AsyncStorage when the provider mounts || initial render
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsynStorage.getItem("cart");
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };
    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever items change
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsynStorage.setItem("cart", JSON.stringify(items));
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    };
    saveCart();
  }, [items]);

  // Function to add an item to the cart

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        // If the item already exists in the cart, update the quantity
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // If the item doesn't exist, add it to the cart
      return [...prevItems, { product, quantity }];
    });
  };

  // Function to remove an item from the cart by product ID
  const removeItem = (productId: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

    // Function to clear the cart
    const clearCart = () => {
      setItems([]);
    };

    // Function to get the total number of items in the cart
    const getItemCount = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    // Function to get the total price of items in the cart
    const getTotal = () => {
        return items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
    }

    return (
        <CartContext.Provider
        value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            getItemCount,
            getTotal,
        }}
    >
        {children}
    </CartContext.Provider>
    );
}


// Custom hook to use the CartContext

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}