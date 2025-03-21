import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axiosInstance from "../../utils/AxiosInstance";
import { useAppSelector } from "../redux/hooks";

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get(`/orders/user/${user.data._id}`);
        if (res.status === 200) {
          setOrders(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#121212] p-5 ">
      <ScrollView className="mt-10">
        <Text className="text-white text-2xl font-bold mb-5">Orders</Text>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        ) : orders.length === 0 ? (
          <Text className="text-white text-center text-lg">
            No orders found.
          </Text>
        ) : (
          orders.map((order) => (
            <TouchableOpacity
              key={order._id}
              className="bg-[#1E1E1E] p-4 rounded-lg mb-3"
              onPress={() => router.push(`/orders/${order._id}`)}
            >
              <Text className="text-white text-lg">Order ID: {order._id}</Text>
              <Text className="text-gray-400">Total: ₱{order.totalPrice}</Text>
              <Text className="text-gray-400">Status: {order.orderStatus}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
