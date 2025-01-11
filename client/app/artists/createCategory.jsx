import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "expo-router";

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

  return (
    <SafeAreaView className="bg-[#121212] flex-1 px-5 py-10">
      {/* form container */}
      <View className="">
        {/* Title and back icon */}
        <View className="flex items-center  flex-row gap-5">
          <TouchableOpacity onPress={redirectBack}>
            <Ionicons name="arrow-back-outline" size={26} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold">Create Category</Text>
        </View>
        {/* Image container */}
        <View>z</View>
        {/* Inputs container */}
        <View className=" mt-8">
          {/* Name input container */}
          <View className="">
            <Text className="text-base text-white mx-5 mb-1">Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="bg-transparent border border-white rounded-lg mb-1 text-white mx-5"
                  placeholder="Enter category name "
                  onBlur={onBlur}
                  placeholderTextColor="#808080"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          {/* Description */}
          <View className="mt-5">
            <Text className="text-base text-white mx-5 mb-1">Description</Text>
            <Controller
              control={control}
              name="description"
              rules={{ required: "Name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  multiline={true}
                  numberOfLines={99}
                  className="bg-transparent border border-white rounded-lg mb-1 text-white mx-5"
                  placeholder="Enter category description "
                  onBlur={onBlur}
                  placeholderTextColor="#808080"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default createCategory;
