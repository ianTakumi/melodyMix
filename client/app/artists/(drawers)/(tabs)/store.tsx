import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import AntDesign from "@expo/vector-icons/AntDesign";
import axiosInstance from "../../../../utils/AxiosInstance";
import { useRouter } from "expo-router";

export default function StorePage() {
  const artist = useAppSelector((state: RootState) => state.auth.artist);
  const router = useRouter();

  const fetchProducts = async () => {
    axiosInstance.get(`/products/${artist.data?._id}`).then((res) => {
      console.log(res.data);
    });
  };

  const fetchCategories = async () => {
    axiosInstance.get(`/categories/${artist.data?._id}`).then((res) => {
      console.log(res.data);
    });
  };

  const redirectToCreateCategoryForm = () => {
    router.push("/artists/createCategory");
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-[#121212]">
      <ScrollView
        className="p-4 flex-1 bg-[#121212]"
        showsVerticalScrollIndicator={false}
      >
        {/* Products container */}
        <View className="">
          {/* Title container */}
          <View>
            <Text className="text-white text-2xl font-serif">My Products</Text>
          </View>
          {/* Products item container */}
          <View className="flex flex-row flex-wrap justify-between">
            <View className="m-6 items-center">
              {/* Image Section */}
              <View className="w-24 h-24 rounded-full  bg-[#3E3E3E] flex justify-center items-center">
                <AntDesign name="plus" size={24} color="white" />
              </View>

              {/* Text Section */}
              <Text className="text-white mt-2 text-base">Add Product</Text>
            </View>
          </View>
        </View>
        {/* Categories container */}
        <View className="mt-44">
          {/* Title container */}
          <View>
            <Text className="text-white text-2xl font-serif">
              My Categories
            </Text>
          </View>
          <View className="flex flex-row flex-wrap justify-between">
            <TouchableOpacity onPress={redirectToCreateCategoryForm}>
              <View className="m-6 items-center">
                {/* Image Section */}
                <View className="w-24 h-24 rounded-lg  bg-[#3E3E3E] flex justify-center items-center">
                  <AntDesign name="plus" size={24} color="white" />
                </View>

                {/* Text Section */}
                <Text className="text-white mt-2 text-base">Add Category</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
