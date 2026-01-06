import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import { notifyToast } from "../../utils/helpers";
import { useRouter } from "expo-router";
import { useAppSelector } from "../redux/hooks";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const artist = useAppSelector((state) => state.auth.artist);

  const fetchOrders = async () => {
    await axiosInstance
      .get(`/orders/${artist.data._id}`)
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.data.data);
        }
      })
      .catch(() => {
        notifyToast("Error", "Error fetching orders", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderRightActions = (orderId) => (
    <TouchableOpacity
      className="bg-blue-600 justify-center items-center w-20 h-24 rounded-r-lg"
      onPress={() =>
        router.push({ pathname: `/artists/EditOrder`, params: { orderId } })
      }
    >
      <FontAwesome name="pencil" size={24} color="white" />
      <Text className="text-white font-bold mt-1">Edit</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 items-center bg-[#121212]">
        <Text className="text-white text-2xl mt-16">Orders</Text>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212] p-5">
      <ScrollView className="mt-10">
        <Text className="text-white text-2xl font-bold mb-5">Orders</Text>
        {orders.length === 0 ? (
          <Text className="text-white text-center text-lg">
            No orders found.
          </Text>
        ) : (
          orders.map((order) => (
            <Swipeable
              key={order._id}
              renderRightActions={() => renderRightActions(order._id)}
            >
              <TouchableOpacity
                className="bg-[#1E1E1E] p-4 rounded-lg mb-3"
                onPress={() => router.push(`/orders/${order._id}`)}
              >
                <Text className="text-white text-lg">
                  Order ID: {order._id}
                </Text>
                <Text className="text-gray-400">
                  Total: ₱{order.totalPrice}
                </Text>
                <Text className="text-gray-400">
                  Status: {order.orderStatus}
                </Text>
              </TouchableOpacity>
            </Swipeable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
