import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/AxiosInstance";
import { notifyToast } from "../../../../utils/helpers";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
} from "../../../redux/slices/ProductSlice";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Store() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());

      await axiosInstance
        .get("/products/")
        .then((res) => {
          if (res.status === 200) {
            dispatch(fetchProductsSuccess(res.data.data));
            console.log("Successfully fetched products", res.data.data);
          }
        })
        .catch((err) => {
          notifyToast("error", "Failed to fetch products", "error");
        });
    };

    fetchProducts();
  }, [dispatch]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <SafeAreaView className="bg-[#121212] flex-1 p-4">
      <Text className="text-white text-2xl font-bold text-center mb-4">
        Artist's Merch Store
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-wrap flex-row justify-between">
          {products.map((product) => (
            <TouchableOpacity
              key={product._id}
              className="w-[48%] bg-[#1E1E1E] rounded-2xl p-4 mb-4 shadow-md"
              onPress={() =>
                router.push({
                  pathname: "/users/ProductDetail",
                  params: { productId: product._id },
                })
              }
            >
              <Image
                source={{
                  uri: product.image?.url || "https://via.placeholder.com/150",
                }}
                className="w-full h-40 rounded-xl mb-2"
                resizeMode="cover"
              />
              <Text className="text-white text-lg font-semibold">
                {product.name}
              </Text>
              <Text className="text-gray-400 text-md">
                ₱{product.price.toFixed(2)}
              </Text>
              {product.artist && (
                <Text className="text-gray-500 italic text-sm mt-1">
                  By {product.artist.name}
                </Text>
              )}
              <TouchableOpacity
                className="bg-[#FF5C5C] mt-3 p-2 rounded-xl items-center"
                onPress={() =>
                  router.push({
                    pathname: "/users/ProductDetail",
                    params: { productId: product._id },
                  })
                }
              >
                <Text className="text-white font-semibold">View Product</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
