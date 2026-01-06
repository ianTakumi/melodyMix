import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "../redux/hooks";
import { notifyToast } from "../../utils/helpers";
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
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

export default function EditProductForm() {
  const router = useRouter();
  const artist = useAppSelector((state) => state.auth.artist);
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null); // Store image URI

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      stock: "",
    },
  });

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

  // Fetch product details
  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`/products/single/${id}`);
      const fetchedProduct = res.data.data;
      setProduct(fetchedProduct);

      // Set form fields
      reset({
        name: fetchedProduct?.name || "",
        price: fetchedProduct?.price ? String(fetchedProduct.price) : "",
        stock: fetchedProduct?.stock ? String(fetchedProduct.stock) : "",
        category: fetchedProduct?.category || "",
      });

      // Set image preview
      setValue("category", fetchedProduct?.category || ""); // Set category value

      setImage(fetchedProduct?.image.url || null); // Assuming product has an 'image' field
    } catch (err) {
      console.error("Error fetching product:", err);
      notifyToast("Error", "Error fetching product", "error");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Pick Image from Gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update image preview
    }
  };

  const onSubmit = async (data) => {
    const isNewImage = image && image.startsWith("file://");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);

    if (isNewImage) {
      // Kapag bagong upload, i-append ang file
      const imageFile = {
        uri: image,
        type: "image/jpeg", // Palitan depende sa file type
        name: "uploaded_image.jpg",
      };
      formData.append("image", imageFile);
    }

    await axiosInstance
      .put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.status === 200) {
          notifyToast("Success", "Product updated successfully", "success");
          router.push("/artists/(drawers)/(tabs)/store");
        }
      })
      .catch((err) => {
        console.error("Error updating product:", err);
        notifyToast("Error", "Failed to update product", "error");
      });
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-[#121212]">
      <ScrollView className="mt-20">
        <Text className="text-3xl font-bold text-white mb-4">Edit Product</Text>

        {/* Product Name */}
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

        {/* Price */}
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

        {/* Category */}
        <Text className="text-white mb-1">Category</Text>
        <SelectList
          setSelected={(value) => {
            setValue("category", value);
            clearErrors("category");
          }}
          data={categories}
          placeholder="Select a category"
          boxStyles={{ marginBottom: 10, backgroundColor: "#1E1E1E" }}
          inputStyles={{ color: "white" }} // Input text color
          dropdownTextStyles={{ color: "white" }} // Dropdown text color
          dropdownItemStyles={{ color: "white" }}
          defaultOption={categories.find(
            (item) => item.value === product?.category
          )} // Ensure default selection
        />
        {errors.category && (
          <Text className="text-red-400">{errors.category.message}</Text>
        )}

        {/* Stock */}
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

        {/* Image Picker */}
        <Text className="text-white mb-1">Product Image</Text>
        <TouchableOpacity
          onPress={pickImage}
          className="mt-2 p-2 bg-blue-600 rounded"
        >
          <Text className="text-white text-center">Pick an Image</Text>
        </TouchableOpacity>

        {/* Preview Image */}
        {image && (
          <Image
            source={{ uri: image }}
            className="w-40 h-40 mt-2 self-center rounded border border-gray-600"
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="mt-4 p-2 bg-green-600 rounded"
        >
          <Text className="text-white text-center">Update Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
