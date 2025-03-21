import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "../redux/hooks";
import axiosInstance from "../../utils/AxiosInstance";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { notifyToast } from "../../utils/helpers";
import { SelectList } from "react-native-dropdown-select-list";

export default function EditOrder() {
  const [order, setOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const { orderId } = useLocalSearchParams();
  const router = useRouter();
  const artist = useAppSelector((state) => state.auth.artist);

  const orderStatusOptions = [
    { key: "Pending", value: "Pending" },
    { key: "Preparing", value: "Preparing" },
    { key: "For delivery", value: "For delivery" },
    { key: "Delivered", value: "Delivered" },
  ];

  const fetchOrder = async () => {
    try {
      const res = await axiosInstance.get(`/orders/single/${orderId}`);
      if (res.status === 200) {
        setOrder(res.data.data);
        setSelectedStatus(res.data.data.orderStatus);
      }
    } catch (err) {
      console.error(err);
      notifyToast("Error", "Error fetching order", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async () => {
    try {
      const res = await axiosInstance.put(`/orders/${orderId}`, {
        orderStatus: selectedStatus,
      });
      if (res.status === 200) {
        notifyToast("Success", "Order status updated!", "success");
        router.push("/artists/Orders");
      }
    } catch (err) {
      console.error(err);
      notifyToast("Error", "Failed to update order", "error");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#121212]">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!order) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#121212]">
        <Text className="text-white text-lg">Order not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212] p-5">
      <ScrollView>
        <Text className="text-white text-2xl font-bold mb-5 mt-10">
          Edit Order
        </Text>

        {/* Order Details */}
        <View className="bg-[#1E1E1E] p-4 rounded-lg mb-5">
          <Text className="text-white text-lg">Order ID: {order._id}</Text>
          <Text className="text-gray-400">Total: ₱{order.totalPrice}</Text>
          <Text className="text-gray-400">Status: {order.orderStatus}</Text>
        </View>

        {/* Order Items */}
        <Text className="text-white text-lg mb-3">Order Items</Text>
        {order.items && order.items.length > 0 ? (
          order.items.map((item) => (
            <View
              key={item._id}
              className="flex-row items-center bg-[#1E1E1E] p-4 rounded-lg mb-3"
            >
              <Image
                source={{ uri: item.productId.image.url }}
                className="w-16 h-16 rounded-lg mr-3"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-white text-lg">
                  {item.productId.name}
                </Text>
                <Text className="text-gray-400">
                  Quantity: {item.quantity} | Price: ₱{item.productId.price}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text className="text-white text-center">
            No items in this order.
          </Text>
        )}

        {/* Status Selector */}
        <Text className="text-white text-lg mt-5 mb-2">
          Update Order Status
        </Text>
        <SelectList
          setSelected={(val) => setSelectedStatus(val)}
          data={orderStatusOptions}
          save="value"
          defaultOption={{ key: order.orderStatus, value: order.orderStatus }}
          boxStyles={{
            backgroundColor: "#1E1E1E",
            borderColor: "#444",
            borderWidth: 1,
          }}
          dropdownStyles={{
            backgroundColor: "#1E1E1E",
            borderColor: "#444",
            borderWidth: 1,
          }}
          dropdownTextStyles={{ color: "white" }}
          inputStyles={{ color: "white" }}
        />

        {/* Save Button */}
        <TouchableOpacity
          className="bg-blue-600 p-3 rounded-lg mt-5"
          onPress={updateOrderStatus}
        >
          <Text className="text-white text-center font-bold">Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
