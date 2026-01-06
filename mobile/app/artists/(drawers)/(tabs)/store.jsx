import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useAppSelector } from "../../../redux/hooks";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import axiosInstance from "../../../../utils/AxiosInstance";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { notifyToast } from "../../../../utils/helpers";

export default function StorePage() {
  const artist = useAppSelector((state) => state.auth.artist);
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get(`/products/${artist.data?._id}`);
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    console.log("Deleting product with ID:", productId);

    await axiosInstance
      .delete(`/products/${productId}`)
      .then((res) => {
        if (res.status === 200) {
          fetchProducts();
          notifyToast("Success", "Product deleted successfully", "success");
        }
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
        notifyToast("Error", "Error deleting product", "error");
      });
  };

  const renderRightActions = (product) => (
    <View className="flex-row w-24 items-center space-x-2 bg-gray-900 p-2 rounded-lg">
      {/* Edit Button */}
      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-md"
        onPress={() =>
          router.push({
            pathname: "/artists/EditProductForm",
            params: { id: product._id },
          })
        }
      >
        <Ionicons name="create-outline" size={20} color="white" />
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        className="bg-red-500 p-3 rounded-md"
        onPress={() => handleDelete(product._id)}
      >
        <Ionicons name="trash-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 px-4 bg-[#121212]">
      <ScrollView
        className="p-4 flex-1 bg-[#121212]"
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text className="text-white text-2xl font-serif mb-4">My Products</Text>

        {/* Product List */}
        <View className="space-y-3">
          {products.length > 0 ? (
            products.map((product) => (
              <Swipeable
                key={product._id}
                renderRightActions={() => renderRightActions(product)}
                containerStyle={{ marginBottom: 10 }} // Ensures spacing
              >
                <View className="flex-row items-center bg-[#1E1E1E] rounded-lg p-4 w-full">
                  {/* Product Image */}
                  <Image
                    source={{
                      uri:
                        product.image?.url || "https://via.placeholder.com/150",
                    }}
                    className="w-24 h-24 rounded-lg"
                    resizeMode="cover"
                  />

                  {/* Product Details */}
                  <View className="ml-4 flex-1">
                    <Text className="text-white text-lg font-semibold">
                      {product.name}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {product.category}
                    </Text>
                    <Text className="text-white text-sm font-bold mt-1">
                      ₱{product.price}
                    </Text>
                  </View>
                </View>
              </Swipeable>
            ))
          ) : (
            <Text className="text-gray-400 text-center mt-4">
              No products available.
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Add Product Button */}
      <TouchableOpacity
        onPress={() => router.push("/artists/ProductForm")}
        className="absolute bottom-20 right-6 bg-[#3E3E3E] w-16 h-16 rounded-full flex justify-center items-center shadow-lg"
      >
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
