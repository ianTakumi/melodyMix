import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import axiosInstance from "../../utils/AxiosInstance";
import { useAppSelector } from "../redux/hooks";
import { notifyToast } from "../../utils/helpers";

export default function ProductForm() {
  const router = useRouter();
  const artist = useAppSelector((state) => state.auth.artist);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState(null);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const categories = [
    { key: "T-Shirt", value: "T-Shirt" },
    { key: "Hoodie", value: "Hoodie" },
    { key: "Cap", value: "Cap" },
    { key: "Poster", value: "Poster" },
    { key: "Sticker", value: "Sticker" },
    { key: "Vinyl", value: "Vinyl" },
    { key: "CD", value: "CD" },
    { key: "Cassette", value: "Cassette" },
    { key: "Keychain", value: "Keychain" },
    { key: "Mug", value: "Mug" },
    { key: "Other", value: "Other" },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async (data) => {
    if (!artist) {
      Alert.alert("Error", "Artist information is missing.");
      return;
    }

    if (!selectedCategory) {
      setError("category", { type: "manual", message: "Category is required" });
      return;
    } else {
      clearErrors("category");
    }

    const formData = new FormData();
    formData.append("artistId", artist.id);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", selectedCategory);
    formData.append("stock", data.stock);

    if (image) {
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "product.jpg",
      });
    }

    try {
      await axiosInstance.post(`/products/${artist.data._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      notifyToast("Success", "Product added successfully", "success");
      router.push("/artists/(drawers)/(tabs)/store");
    } catch (error) {
      Alert.alert("Error", "Failed to add product.");
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-[#121212]">
      <ScrollView className="mt-20">
        <Text className="text-3xl font-bold text-white mb-4">
          Add a Product
        </Text>

        <Text className="text-white mb-1">Product Name</Text>
        <Controller
          control={control}
          rules={{ required: "Product name is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-600 bg-gray-800 text-white p-2 rounded mb-2"
              placeholder="Enter product name"
              placeholderTextColor="#bbb"
              value={value}
              onChangeText={onChange}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text className="text-red-400">{errors.name.message}</Text>
        )}

        <Text className="text-white mb-1">Price</Text>
        <Controller
          control={control}
          rules={{ required: "Price is required", min: 1 }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-600 bg-gray-800 text-white p-2 rounded mb-2"
              placeholder="Enter price"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
          name="price"
        />
        {errors.price && (
          <Text className="text-red-400">{errors.price.message}</Text>
        )}

        <Text className="text-white mb-1">Category</Text>
        <SelectList
          setSelected={(value) => {
            setSelectedCategory(value);
            clearErrors("category");
          }}
          data={categories}
          placeholder="Select a category"
          boxStyles={{ marginBottom: 10, backgroundColor: "#1E1E1E" }}
          dropdownTextStyles={{ color: "white" }}
          inputStyles={{ color: "white" }}
        />
        {errors.category && (
          <Text className="text-red-400">{errors.category.message}</Text>
        )}

        <Text className="text-white mb-1">Stock</Text>
        <Controller
          control={control}
          rules={{ required: "Stock is required", min: 0 }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-gray-600 bg-gray-800 text-white p-2 rounded mb-2"
              placeholder="Enter stock quantity"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
          name="stock"
        />
        {errors.stock && (
          <Text className="text-red-400">{errors.stock.message}</Text>
        )}

        <TouchableOpacity
          onPress={pickImage}
          className="mt-4 p-2 bg-blue-600 rounded"
        >
          <Text className="text-white text-center">Pick an Image</Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={{ uri: image }}
            className="w-40 h-40 mt-2 self-center rounded"
          />
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="mt-4 p-2 bg-green-600 rounded"
        >
          <Text className="text-white text-center">Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
