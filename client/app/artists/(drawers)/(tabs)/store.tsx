import React from "react";
import { SafeAreaView, Text, View, ScrollView, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import ProfilePicture from "../../../../components/ProfilePicture";
export default function StorePage() {
  const artist = useAppSelector((state: RootState) => state.auth.artist);

  return (
    <SafeAreaView className="flex-1 px-4 bg-[#121212]">
      <ScrollView className="mt-8"></ScrollView>
      {/* Content Section */}
    </SafeAreaView>
  );
}
