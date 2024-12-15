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
import ProfilePicture from "../../../components/ProfilePicture";
import { useSelector } from "react-redux";

export default function IndexPage() {
  const user = useSelector((state: any) => state.user.user);
  const isAuthenticated = useSelector(
    (state: any) => state.user.isAuthenticated
  );
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  const data = [
    {
      id: "1",
      name: "Join the Club",
      role: "Artist",
      url: require("../../../assets/images/eheads.jpg"),
    },
    {
      id: "2",
      name: "Eraserheads",
      role: "Artist",
      url: require("../../../assets/images/eheads.jpg"),
    },
    {
      id: "3",
      name: "Silent Sanctuary",
      role: "Artist",
      url: require("../../../assets/images/silentSanctuary.jpg"),
    },
  ];
  const renderItem = ({
    item,
  }: {
    item: { id: string; url: any; name: string; role: string };
  }) => (
    <View className="m-4 items-center">
      {/* Image Section */}
      <View className="w-24 h-24 rounded-full overflow-hidden">
        <Image source={item.url} className="w-full h-full object-cover" />
      </View>

      {/* Text Section */}
      <Text className="text-white mt-2 text-base">{item.name}</Text>
      <View className="w-full mt-1">
        <Text className="text-gray-400 text-left text-base">{item.role}</Text>
      </View>
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
        {/* Header Section */}
        <View className="pl-2 pt-10 flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-4">
            <ProfilePicture name={user.name} imageUrl={""} />
            <Text className="text-white font-bold font-mono text-3xl">
              Your Library
            </Text>
          </View>
          <View className="flex flex-row items-center gap-5">
            <AntDesign name="search1" size={32} color="white" />
            <AntDesign name="plus" size={32} color="white" />
          </View>
        </View>

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
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={3}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
