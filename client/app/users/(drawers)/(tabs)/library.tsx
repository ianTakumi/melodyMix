import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

export default function IndexPage() {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  const data = [
    {
      id: "1",
      name: "Join the Club",
      role: "Artist",
      url: require("../../../../assets/images/eheads.jpg"),
    },
    {
      id: "2",
      name: "Eraserheads",
      role: "Artist",
      url: require("../../../../assets/images/eheads.jpg"),
    },
    {
      id: "3",
      name: "Silent Sanctuary",
      role: "Artist",
      url: require("../../../../assets/images/silentSanctuary.jpg"),
    },
  ];
  const renderItem = ({
    item,
  }: {
    item: { id: string; url: any; name: string; role: string };
  }) => (
    <View className="m-6 items-center">
      {/* Image Section */}
      <View className="w-24 h-24 rounded-full overflow-hidden">
        <Image source={item.url} className="w-full h-full object-cover" />
      </View>

      {/* Text Section */}
      <Text className="text-white mt-2 text-base">{item.name}</Text>
      <Text className="text-gray-400  text-base">{item.role}</Text>
    </View>
  );

  return (
    <LinearGradient
      className="flex-1"
      colors={["#121212", "#282828", "#121212"]} // Define the gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView className="flex-1 px-4">
        {/* Content Section */}
        <View className="flex flex-row justify-normal items-center gap-4 mt-5  rounded-full p-2">
          <TouchableOpacity>
            <Text className="text-white bg-[#3E3E3E] rounded-3xl px-4 py-1">
              Artist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-white bg-[#3E3E3E] rounded-3xl px-4 py-1">
              Podcast
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-5 flex flex-row  gap-80">
          {/* Left Section */}
          <View className="flex flex-row items-center space-x-1 ">
            <Feather name="arrow-down" size={20} color="white" />
            <Feather name="arrow-up" size={20} color="white" />
            <Text className="text-white ml-1">Recent</Text>
          </View>

          {/* Right Section */}
          <TouchableOpacity onPress={handleClick}>
            <View className="flex flex-row items-center">
              {isClicked ? (
                <Feather name="grid" size={25} color="white" />
              ) : (
                <Feather name="list" size={25} color="white" />
              )}
            </View>
          </TouchableOpacity>
        </View>
        {/* Main Content */}

        <View className="">
          {/* list of currently artist and podcast saved to user's playlist */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={3}
            ListFooterComponent={
              <View className="m-6 items-center">
                {/* Image Section */}
                <View className="w-24 h-24 rounded-full  bg-[#3E3E3E] flex justify-center items-center">
                  <AntDesign name="plus" size={24} color="white" />
                </View>

                {/* Text Section */}
                <Text className="text-white mt-2 text-base">Add Artists</Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
