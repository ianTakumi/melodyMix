import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import axiosInstance from "../../utils/AxiosInstance";

export default function OrderDetail() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/orders/single/${orderId}`);
      if (res.status === 200) {
        setOrder(res.data.data);
      } else {
        setError("Failed to fetch order details");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#121212] items-center justify-center">
        <ActivityIndicator size="large" color="#BB86FC" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#121212] items-center justify-center">
        <Text className="text-red-400 text-lg">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212] p-5">
      <Text className="text-white text-2xl font-bold mb-3 mt-10">
        Order Details
      </Text>

      <View className="bg-[#1E1E1E] p-4 rounded-lg mb-4">
        <Text className="text-gray-400 font-semibold">Order ID:</Text>
        <Text className="text-white">{order._id}</Text>

        <Text className="text-gray-400 font-semibold mt-2">User:</Text>
        <Text className="text-white">{order.userId?.name || "N/A"}</Text>

        <Text className="text-gray-400 font-semibold mt-2">Artist:</Text>
        <Text className="text-white">{order.artistId?.name || "N/A"}</Text>

        <Text className="text-gray-400 font-semibold mt-2">Total Price:</Text>
        <Text className="text-white">₱{order.totalPrice}</Text>

        <Text className="text-gray-400 font-semibold mt-2">Status:</Text>
        <Text
          className={`text-lg font-bold ${
            order.orderStatus === "Delivered"
              ? "text-green-400"
              : "text-yellow-400"
          }`}
        >
          {order.orderStatus}
        </Text>

        <Text className="text-gray-400 font-semibold mt-2">Payment:</Text>
        <Text className="text-white">
          {order.paymentMethod} - {order.paymentStatus}
        </Text>
      </View>

      <Text className="text-purple-400 text-lg font-bold mb-2">
        Items Ordered
      </Text>
      <FlatList
        data={order.items}
        keyExtractor={(item) => item.productId._id}
        renderItem={({ item }) => (
          <View className="bg-[#1E1E1E] p-3 rounded-lg flex-row justify-between mb-2">
            <Text className="text-white">{item.productId.name}</Text>
            <Text className="text-white">x{item.quantity}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
