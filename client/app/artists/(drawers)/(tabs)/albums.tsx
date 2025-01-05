import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import ProfilePicture from "../../../../components/ProfilePicture";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
export default function AlbumPage() {
  const artist = useAppSelector((state: RootState) => state.auth.artist);

  return (
    <SafeAreaView className="flex-1 px-4 bg-[#121212]">
      {/* Content Section */}
      <View>
        <TouchableOpacity className="bg-primary_a0 flex-row items-center rounded-xl py-2 px-4">
          <AntDesign name="plus" size={24} color="black" />
          <Text className="ml-2 text-black">Add albums</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
