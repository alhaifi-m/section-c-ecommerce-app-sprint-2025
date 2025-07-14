
import type { Product } from "@/types";

const BASE_URL = "https://fakestoreapi.com"

//  Fetch featured products service

export const fetchFeaturedProducts = async (limit = 10): Promise<Product[]> => {
    try {
        const response = await fetch(`${BASE_URL}/products?limit=${limit}`)
        const data = await response.json()
        return data as Product[];
    } catch (error) {
        console.error("Error fetching featured products:", error);
        return [];
    }
}

// Fetch products by category service

export const fetchProductsByCategory = async (category: string, limit = 10): Promise<Product[]> => {
    try {
        const response = await fetch(`${BASE_URL}/products/category/${category}`)
        const data = await response.json()
        return data as Product[];
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }
}

// Fetch all available product categories return an array of category names

export const fetchAllCategories = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${BASE_URL}/products/categories`)
        const data = await response.json()
        return data as string[];    
    } catch (error) {
        console.error("Error fetching all categories:", error);
        return [];
    }
}
//  Fetch products by search query, return an array of products

export const searchProducts = async (query: string): Promise<Product[]> => {
    try {
        const response = await fetch(`${BASE_URL}/products`)
        const data = await response.json() as Product[];

        if(!query.trim()){
            return []
        }

        const lowerCaseQuery = query.toLowerCase().trim();

        return data.filter((product)=>
            product.title.toLowerCase().includes(lowerCaseQuery) ||
            product.description.toLowerCase().includes(lowerCaseQuery) ||
            product.category.toLowerCase().includes(lowerCaseQuery)
        )
      
    } catch (error) {
        console.error("Error searching products:", error);
        return [];
    }
}

// Fetch product by its ID, return a single product

export const fetchProductById = async (id: number): Promise<Product | null> => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        const data = await response.json();
        return data as Product;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
}