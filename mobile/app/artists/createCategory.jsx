import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import axiosInstance from "../../utils/AxiosInstance";
import { notifyToast } from "../../utils/helpers";
import { useAppSelector } from "../redux/hooks";

const createCategory = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      image: null,
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [opacity, setOpacity] = useState(1);
  const artist = useAppSelector((state) => state.auth.artist);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    const uri = data.image;
    const filename = uri.split("/").pop(); // Extract filename from URI
    const fileExtension = filename.split(".").pop(); // Get file extension
    const mimeType = `image/${fileExtension}`; // Construct mime type

    // Convert URI to File format
    const imageFile = {
      uri,
      name: filename,
      type: mimeType,
    };
    formData.append("image", imageFile);
    setLoading(true);
    try {
      axiosInstance
        .post(`/categories/${artist.data._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          setLoading(false);
          notifyToast("Category created successfully", "success", "success");
          router.push("artist/(drawers)/(tabs)/store");
        });
    } catch (error) {
      console.log(error);
      notifyToast("An error occurred", "error", "error");
      setLoading(false);
    }
  };

  const redirectBack = () => {
    router.back();
  };

  const pickImage = async (onChange) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="bg-[#121212] flex-1 px-5 py-10">
      {/* form container */}
      <View>
        {/* Title and back icon */}
        <View className="flex items-center flex-row gap-5">
          <TouchableOpacity onPress={redirectBack}>
            <Ionicons name="arrow-back-outline" size={26} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold">Create Category</Text>
        </View>

        {/* Inputs container */}
        <View className="mt-8">
          {/* Name input */}
          <View className="mx-5">
            <Text className="text-base text-white  mb-1">Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="bg-transparent border border-white rounded-lg mb-1 text-white "
                  placeholder="Enter category name"
                  onBlur={onBlur}
                  placeholderTextColor="#808080"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Text className="text-red-500 ">{errors.name?.message}</Text>
          </View>
          {/* Description input */}
          <View className="mt-5 mx-5 ">
            <Text className="text-base text-white  mb-1">Description</Text>
            <Controller
              control={control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  multiline
                  numberOfLines={4}
                  className="bg-transparent border border-white rounded-lg mb-1 text-white "
                  placeholder="Enter category description"
                  onBlur={onBlur}
                  placeholderTextColor="#808080"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Text className="text-red-500 ">{errors.description?.message}</Text>
          </View>

          {/* Image input */}
          <View className="mt-5 mx-5">
            <Text className="text-base text-white  mb-1">Image</Text>
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, value } }) => (
                <View className="mt-2">
                  <TouchableOpacity
                    className="bg-[#1F1F1F] p-4 rounded-lg"
                    onPress={() => pickImage(onChange)}
                  >
                    <Text className="text-white text-center">
                      {value ? "Change Image" : "Pick an Image"}
                    </Text>
                  </TouchableOpacity>

                  {/* Display the selected image */}
                  {value && (
                    <Image
                      source={{ uri: value }}
                      className="w-full h-96 mt-3 rounded-lg"
                      resizeMode="cover"
                    />
                  )}
                </View>
              )}
            />
            <Text className="text-red-500 ">{errors.name?.message}</Text>
          </View>
          <Pressable
            onPress={handleSubmit(onSubmit)}
            onPressIn={() => setOpacity(0.6)}
            onPressOut={() => setOpacity(1)}
            className="mt-5 bg-primary_a0 rounded-lg h-10 flex items-center justify-center  mx-5 my-5"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-white  text-center">Submit</Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default createCategory;
