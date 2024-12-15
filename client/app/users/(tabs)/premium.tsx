import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function IndexPage() {
  return (
    <LinearGradient
      className="flex-1"
      colors={["#121212", "#282828", "#121212"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView className="flex-1">
        {/* ScrollView wraps all content */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header Image with Text Overlay */}
          <View className="relative h-96 rounded-lg overflow-hidden">
            <Image
              className="w-full h-full"
              resizeMode="cover"
              source={require("../../../assets/images/abstract.webp")}
            />
            {/* Text Overlay */}
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-center px-4">
              <Text className="text-white text-xl font-bold">Premium</Text>
              <Text className="text-white text-4xl font-semibold mt-2">
                Enjoy your music streaming for only ₱99 with Melody Mix
              </Text>
            </View>
          </View>

          {/* CTA Button */}
          <TouchableOpacity className="bg-white rounded-xl py-3 mt-10 mx-5">
            <Text className="text-black font-bold text-center text-lg">
              Get Premium
            </Text>
          </TouchableOpacity>

          {/* Description Section */}
          <Text className="text-gray-400 mt-4 text-sm px-4">
            Unlock uninterrupted music streaming for just ₱99 per month.
            Experience your favorite tunes without ads, download tracks for
            offline listening, and play songs anytime, anywhere. Join the
            ultimate music journey today!
          </Text>

          {/* Features List */}
          <View className="mt-8 bg-surface_a20 p-4 mx-4 text-white">
            <View className="my-2">
              <Text className="text-white text-2xl">Why join Premium?</Text>
            </View>
            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View className="flex-row items-center mt-4">
              <MaterialIcons name="music-note" size={20} color="white" />
              <Text className="text-white ml-2">Ad-free music listening</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <MaterialIcons name="cloud-download" size={20} color="white" />
              <Text className="text-white ml-2">
                Download to listen offline
              </Text>
            </View>
            <View className="flex-row items-center mt-2">
              <MaterialIcons name="playlist-play" size={20} color="white" />
              <Text className="text-white ml-2">Play songs in any order</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <MaterialIcons name="headphones" size={24} color="white" />
              <Text className="text-white ml-2">High audio quality</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <MaterialCommunityIcons
                name="playlist-plus"
                size={24}
                color="white"
              />
              <Text className="text-white ml-2">Organize listening queue</Text>
            </View>
          </View>

          {/* Available Plans */}
          <View className="mt-8 px-4">
            <Text className="text-white text-2xl font-bold mb-8">
              Available Plans
            </Text>
          </View>

          {/* Mini plan */}
          <View className=" bg-surface_a20 rounded-xl p-4 mx-4 mb-8 text-white">
            {/* Image and Title in a Row */}
            <View className="flex-row items-center my-2">
              <Image
                className="h-6 w-6 mr-1"
                resizeMode="contain"
                source={require("../../../assets/images/whiteLogo.png")}
              />
              <View>
                <Text className="text-white text-base font-semibold">
                  Premium
                </Text>
              </View>
            </View>
            <Text className="text-[#D0F569] font-bold text-2xl">Mini</Text>
            <Text className="text-white font-bold text-xl mb-2">
              ₱30 for 1 week
            </Text>

            {/* Divider */}
            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            {/* Features List of mini plan */}
            <View className="flex-row items-center mt-4 mb-0">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white ml-2 font-bold">
                One-time payment
              </Text>
            </View>
            <View className="flex-row items-center ">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white ml-2 font-bold">
                Basic audio quality
              </Text>
            </View>
            <View className="flex-row items-center ">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white ml-2 font-bold">
                1 mobile-only Premium account
              </Text>
            </View>
            <TouchableOpacity className="bg-[#D0F569] rounded-full p-4 my-3">
              <Text className="text-black text-center font-bold text-lg">
                Get Premium Mini
              </Text>
            </TouchableOpacity>
          </View>

          {/* Individual plan */}
          <View className=" bg-surface_a20 rounded-xl p-4 mx-4 mb-8 text-white">
            {/* Image and Title in a Row */}
            <View className="flex-row items-center my-2">
              <Image
                className="h-6 w-6 mr-1"
                resizeMode="contain"
                source={require("../../../assets/images/whiteLogo.png")}
              />
              <View>
                <Text className="text-white text-base font-semibold">
                  Premium
                </Text>
              </View>
            </View>
            <Text className="text-[#FED4D8] font-bold text-2xl">
              Individual
            </Text>
            <Text className="text-white font-bold text-xl mb-2">
              ₱30 for 1 week
            </Text>

            {/* Divider */}
            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            {/* Features List of individual plan */}
            <View className="flex-row items-center mt-4 mb-0">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white font-bold ml-2">
                1 Premium account
              </Text>
            </View>
            <View className="flex-row items-center ">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white font-bold ml-2">Cancel Anytime</Text>
            </View>
            <View className="flex-row items-center ">
              <Text className="text-3xl font-bold text-white">·</Text>
              <Text className="text-white ml-2">
                Subscribe or one-time payment
              </Text>
            </View>
            <TouchableOpacity className="bg-[#FED4D8] rounded-full p-4 my-3">
              <Text className="text-black text-center font-bold text-lg">
                Get Premium Individual
              </Text>
            </TouchableOpacity>
          </View>

          {/* Family Plan */}
          <View className=" bg-surface_a20 rounded-xl p-4 mx-4 mb-8 text-white">
            {/* Image and Title in a Row */}
            <View className="flex-row items-center my-2">
              <Image
                className="h-6 w-6 mr-1"
                resizeMode="contain"
                source={require("../../../assets/images/whiteLogo.png")}
              />
              <View>
                <Text className="text-white text-base font-semibold">
                  Premium
                </Text>
              </View>
            </View>
            <Text className="text-[#A5BACF] font-bold text-2xl">Family</Text>
            <Text className="text-white font-bold text-xl mb-2">
              ₱30 for 1 week
            </Text>

            {/* Divider */}
            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            {/* Features List of individual plan */}
            <View className="flex-row items-center mt-4 mb-0">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white font-bold ml-2">
                Up to 6 Premium accounts
              </Text>
            </View>
            <View className="flex-row items-center ">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white font-bold ml-2">Cancel Anytime</Text>
            </View>

            <TouchableOpacity className="bg-[#A5BACF] rounded-full p-4 my-3">
              <Text className="text-black text-center font-bold text-lg">
                Get Premium Family
              </Text>
            </TouchableOpacity>
          </View>

          {/* Duo Plan */}
          <View className=" bg-surface_a20 rounded-xl p-4 mx-4 mb-8 text-white">
            {/* Image and Title in a Row */}
            <View className="flex-row items-center my-2">
              <Image
                className="h-6 w-6 mr-1"
                resizeMode="contain"
                source={require("../../../assets/images/whiteLogo.png")}
              />
              <View>
                <Text className="text-white text-base font-semibold">
                  Premium
                </Text>
              </View>
            </View>
            <Text className="text-[#FFC864] font-bold text-2xl">Duo</Text>
            <Text className="text-white font-bold text-xl mb-2">
              ₱30 for 1 week
            </Text>

            {/* Divider */}
            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            {/* Features List of individual plan */}
            <View className="flex-row items-center mt-4 mb-0">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white font-bold ml-2">
                2 Premium accounts
              </Text>
            </View>
            <View className="flex-row items-center ">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white font-bold ml-2">Cancel Anytime</Text>
            </View>

            <TouchableOpacity className="bg-[#FFC864] rounded-full p-4 my-3">
              <Text className="text-black text-center font-bold text-lg">
                Get Premium Duo
              </Text>
            </TouchableOpacity>
          </View>

          {/* Student plan */}
          <View className=" bg-surface_a20 rounded-xl p-4 mx-4 mb-20 text-white">
            {/* Image and Title in a Row */}
            <View className="flex-row items-center my-2">
              <Image
                className="h-6 w-6 mr-1"
                resizeMode="contain"
                source={require("../../../assets/images/whiteLogo.png")}
              />
              <View>
                <Text className="text-white text-base font-semibold">
                  Premium
                </Text>
              </View>
            </View>
            <Text className="text-[#C5B1D4] font-bold text-2xl">Student</Text>
            <Text className="text-white font-bold text-xl mb-2">
              ₱30 for 1 week
            </Text>

            {/* Divider */}
            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            {/* Features List of individual plan */}
            <View className="flex-row items-center mt-4 mb-0">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white font-bold ml-2">
                1 verified Premium account
              </Text>
            </View>
            <View className="flex-row items-center ">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white font-bold ml-2">
                Discount for eligible students
              </Text>
            </View>
            <View className="flex-row items-center ">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white font-bold ml-2">Cancel anytime</Text>
            </View>
            <View className="flex-row items-center ">
              <Text className="text-3xl text-white">·</Text>
              <Text className="text-white font-bold ml-2">
                Subscribe or one-time payment
              </Text>
            </View>

            <TouchableOpacity className="bg-[#C5B1D4] rounded-full p-4 my-3">
              <Text className="text-black text-center font-bold text-lg">
                Get Premium Student
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
