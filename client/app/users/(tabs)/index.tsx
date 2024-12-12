import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

export default function IndexPage() {
  return (
    <LinearGradient
      className="flex-1"
      colors={["#121212", "#282828", "#121212"]} // Define the gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView className="flex-1 px-4">
        {/* Header Section */}
        <View className="pl-2 pt-10 flex flex-row justify-between items-center">
          <Text className="text-white font-bold font-mono text-3xl">
            Made for You
          </Text>
          <View className="flex-row justify-center items-center gap-5 space-x-4">
            <MaterialIcons name="notifications-none" size={32} color="white" />
            <Entypo name="back-in-time" size={32} color="white" />
            <Feather name="settings" size={32} color="white" />
          </View>
        </View>

        {/* Content Section */}
      </SafeAreaView>
    </LinearGradient>
  );
}
