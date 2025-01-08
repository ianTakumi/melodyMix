import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

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

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
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
          <View>
            <Text className="text-base text-white mx-5 mb-1">Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="bg-transparent border border-white rounded-lg mb-1 text-white mx-5"
                  placeholder="Enter category name"
                  onBlur={onBlur}
                  placeholderTextColor="#808080"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          {/* Description input */}
          <View className="mt-5">
            <Text className="text-base text-white mx-5 mb-1">Description</Text>
            <Controller
              control={control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  multiline
                  numberOfLines={4}
                  className="bg-transparent border border-white rounded-lg mb-1 text-white mx-5"
                  placeholder="Enter category description"
                  onBlur={onBlur}
                  placeholderTextColor="#808080"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>

          {/* Image input */}
          <View className="mt-5">
            <Text className="text-base text-white mx-5 mb-1">Image</Text>
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, value } }) => (
                <View className="mx-5">
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
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default createCategory;
