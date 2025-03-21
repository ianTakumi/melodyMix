import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAppSelector } from "../redux/hooks";
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { getCartItems } from "../../utils/SQlite/cartDB";
import axiosInstance from "../../utils/AxiosInstance";

export default function Carts() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  // Fetch cart data properly
  const fetchCartData = async () => {
    try {
      const items = await getCartItems();
      console.log("🛒 Fetched Cart Items:", items);
      setCartItems(items);
    } catch (error) {
      console.error("❌ Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // Function to update quantity
  const updateQuantity = (id, action) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // Swipeable buttons
  const renderRightActions = (item) => (
    <View className="flex-row items-center mr-10">
      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded-lg mr-2"
        onPress={() => updateQuantity(item.id, "decrease")}
      >
        <Text className="text-white text-lg">-</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-500 px-4 py-2 rounded-lg"
        onPress={() => updateQuantity(item.id, "increase")}
      >
        <Text className="text-white text-lg">+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView className="flex-1 bg-[#181818] p-4">
      <SafeAreaView className="flex-1 bg-[#121212]">
        <Text className="text-2xl font-bold text-center text-white mt-16">
          Your Cart
        </Text>

        <ScrollView>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Swipeable
                key={item.id}
                renderRightActions={() => renderRightActions(item)}
              >
                <View className="flex-row items-center bg-[#242424] p-4 rounded-lg mb-3 shadow-md shadow-black mx-10">
                  <Image
                    source={{
                      uri: item.image || "https://via.placeholder.com/100",
                    }}
                    className="w-20 h-20 rounded-lg mr-4"
                  />
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-white">
                      {item.name}
                    </Text>
                    <Text className="text-gray-400">
                      Category: {item.category}
                    </Text>
                    <Text className="text-gray-400">Price: ₱{item.price}</Text>
                    <Text className="text-gray-400">
                      Quantity: {item.quantity}
                    </Text>
                    <Text className="text-blue-400 font-bold">
                      Total: ₱{item.totalPrice}
                    </Text>
                  </View>
                </View>
              </Swipeable>
            ))
          ) : (
            <Text className="text-center text-lg text-gray-500 mt-10">
              Your cart is empty.
            </Text>
          )}
        </ScrollView>
        {cartItems.length > 0 && (
          <TouchableOpacity
            className="bg-[#43B9EA] py-4 rounded-lg mx-10 mt-5 mb-10"
            onPress={() => router.push("/users/Checkout")}
          >
            <Text className="text-center text-lg font-bold text-white">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
