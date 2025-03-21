import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import axiosInstance from "../../utils/AxiosInstance";
import { useRouter } from "expo-router";
import { getCartItems, clearCart } from "../../utils/SQlite/cartDB";
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import { useAppSelector } from "../redux/hooks";
import {
  placeOrderStart,
  placeOrderFailure,
  placeOrderSuccess,
} from "../redux/slices/OrderSlice";
import { useAppDispatch } from "../redux/hooks";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const orderState = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  // react-hook-form setup
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      paymentMethod: "",
    },
  });

  const fetchCartData = async () => {
    try {
      const items = await getCartItems();
      setCartItems(items);
    } catch (error) {
      console.error("❌ Error fetching cart data:", error);
    }
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      console.warn("⚠️ No items in the cart to checkout.");
      return;
    }

    dispatch(placeOrderStart());

    const orderItems = cartItems.map(({ id, quantity }) => ({
      product_id: id,
      quantity,
    }));

    if (data.paymentMethod === "COD") {
      console.log("Paying in cash");
      try {
        const cleanedData = {
          items: orderItems,
          userId: user.data._id,
          address: data.address,
          paymentMethod: data.paymentMethod,
        };
        const res = await axiosInstance.post(`/orders/`, cleanedData);

        if (res.status === 201) {
          dispatch(placeOrderSuccess(res.data)); // Dispatch success with order data

          console.log("✅ Order placed successfully:", res.data);
          setCartItems([]);
          clearCart();
          router.push("/users/Orders");
        }
      } catch (error) {
        console.error("❌ Checkout failed:", error);
        dispatch(placeOrderFailure(error.message)); // Dispatch failure with error message
      }
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#121212] p-6">
      <Text className="text-2xl font-bold text-center text-white mb-5 mt-16">
        Checkout
      </Text>

      {/* Address Input */}
      <Text className="text-white mb-2">Shipping Address</Text>
      <Controller
        control={control}
        name="address"
        rules={{ required: "Address is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-[#242424] text-white p-3 rounded-lg mb-2"
            placeholder="Enter your address"
            placeholderTextColor="#888"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Error Message */}
      {errors.address && (
        <Text className="text-red-500 text-sm mb-4">
          {errors.address.message}
        </Text>
      )}

      {/* Payment Method Dropdown */}
      <Text className="text-white mb-2">Payment Method</Text>
      <Controller
        control={control}
        name="paymentMethod"
        rules={{ required: "Payment method is required" }}
        render={({ field: { onChange, value } }) => (
          <SelectList
            setSelected={onChange}
            data={[
              { key: "COD", value: "Cash on Delivery" },
              { key: "Card", value: "Credit Card" },
            ]}
            placeholder="Select Payment Method"
            search={false}
            boxStyles={{ backgroundColor: "#242424", borderRadius: 8 }}
            inputStyles={{ color: "white" }}
            dropdownTextStyles={{ color: "white" }}
            defaultOption={{ key: value, value }}
          />
        )}
      />

      {/* Error Message */}
      {errors.paymentMethod && (
        <Text className="text-red-500 text-sm mb-4">
          {errors.paymentMethod.message}
        </Text>
      )}

      {/* Product List */}
      <Text className="text-xl font-semibold text-white mb-3 mt-5">
        Products
      </Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-[#1E1E1E] p-4 rounded-xl mb-3 shadow-md shadow-black">
            <View className="flex-1">
              <Text className="text-lg font-bold text-white">{item.name}</Text>
              <Text className="text-gray-400 text-sm">{item.quantity} pcs</Text>
            </View>
            <Text className="text-lg font-bold text-[#43B9EA]">
              ₱{(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        )}
      />

      {/* Total Price */}
      <Text className="text-xl font-bold text-white text-right mt-5">
        Total: ₱{getTotalPrice()}
      </Text>

      {/* Confirm Order Button */}
      <TouchableOpacity
        className="bg-[#43B9EA] py-4 rounded-lg mt-5"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-center text-lg font-bold text-white">
          Confirm Order
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
