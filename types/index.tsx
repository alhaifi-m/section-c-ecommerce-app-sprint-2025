import React from "react";
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
    price: number;
}

export interface SearchParams {
  query?: string;
  category?: string;
}

export interface ProductCardProps {
  product: Product;
  style?: object;
  onPress?: () => void;
}

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
}

export interface ProductCarouselProps {
  title: string;
  products: Product[];
  style?: object;
}

export interface CategoryPillsProps {
  categories: string[];
  selectedCategory?: string | null;
  onSelectCategory?: (category: string) => void;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
  updateQuantity: (productId: number, quantity: number) => void;
}

export interface CartProviderProps {
  children: React.ReactNode;
}
