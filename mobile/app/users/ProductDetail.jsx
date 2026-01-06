import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "../redux/hooks";
import {
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  ScrollView,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  addToCart,
  checkCartTable,
  getCartItems,
  resetDatabase,
} from "../../utils/SQlite/cartDB";
import { notifyToast } from "../../utils/helpers";

export default function ProductDetail() {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const { products, loading } = useAppSelector((state) => state.product);
  const product = products.find((p) => p._id === productId);

  if (loading) {
    return (
      <View className="flex-1 bg-[#121212] items-center justify-center">
        <ActivityIndicator size="large" color="#FF5C5C" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 bg-[#121212] items-center justify-center">
        <Text className="text-white text-lg">Product not found.</Text>
      </View>
    );
  }

  const handleAddToCart = async () => {
    // console.log(product);
    // await resetDatabase();
    // console.log("success");
    addToCart(product, 1);
    notifyToast("Success", "Added to cart!", "success");
    getCartItems((cartItems) => {
      console.log("🛒 Cart Items:", cartItems);
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212] p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <TouchableOpacity
          className="mb-4 bg-gray-800 p-2 rounded-xl"
          onPress={() => router.back()}
        >
          <Text className="text-white text-center">← Go Back</Text>
        </TouchableOpacity>

        {/* Product Image */}
        <Image
          source={{
            uri: product.image?.url || "https://via.placeholder.com/150",
          }}
          className="w-full h-64 rounded-xl"
          resizeMode="cover"
        />

        {/* Product Name */}
        <Text className="text-white text-2xl font-bold mt-4">
          {product.name}
        </Text>

        {/* Price */}
        <Text className="text-gray-400 text-lg mt-1">
          Price: ₱{product.price.toFixed(2)}
        </Text>

        {/* Category */}
        <Text className="text-gray-300 text-md mt-1">
          Category: {product.category}
        </Text>

        {/* Stock */}
        <Text className="text-gray-300 text-md mt-1">
          Stock Available: {product.stock}
        </Text>

        {/* Sales Count */}
        <Text className="text-gray-300 text-md mt-1">
          Sold: {product.sales_count} units
        </Text>

        {/* Artist Name */}
        {product.artist && (
          <Text className="text-gray-500 italic text-md mt-2">
            By: {product.artist.name}
          </Text>
        )}

        {/* Add to Cart Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleAddToCart}
          className="bg-[#FF5C5C] p-4 rounded-xl mt-6 flex-row items-center justify-center space-x-2 shadow-lg shadow-black"
        >
          <FontAwesome5 name="shopping-cart" size={20} color="white" />
          <Text className="text-white text-lg font-semibold ml-5">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
