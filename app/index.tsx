import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "../api/product-service";
import CartIcon from "@/components/cart-icon";
import type { Product, } from "@/types";
import { Stack } from "expo-router";
import SearchBar from "@/components/search-bar";


export default function Index() {
  

  return (
   <>
   <Stack.Screen
     name="Home"
     options={{
       headerTitle: "MY STORE",
       headerRight: () => <CartIcon />,
     }}
   />
   <SearchBar onSearch={(query) => console.log("Searching for:", query)} />
   </>
  );
}
