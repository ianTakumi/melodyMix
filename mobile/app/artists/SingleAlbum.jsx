import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import axiosInstance from "../../utils/AxiosInstance";
import { useLocalSearchParams, useRouter } from "expo-router";
import { notifyToast } from "../../utils/helpers";

export default function SingleAlbum() {
  const [album, setAlbum] = useState(null);
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await axiosInstance.get(`/albums/single/${id}`);
        setAlbum(res.data.data);
      } catch (err) {
        notifyToast("Error", "An error occurred!", "error");
      }
    };
    fetchAlbum();
  }, []);

  const genreColors = {
    Rock: "#FF4C4C",
    "Hip-Hop": "#FF914D",
    Pop: "#FFCD4B",
    Jazz: "#4CAF50",
    Classical: "#009688",
    Electronic: "#673AB7",
    Country: "#795548",
    Indie: "#E91E63",
    Blues: "#2196F3",
    Reggae: "#4CAF50",
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Album Header */}
        <View className="relative h-64">
          <LinearGradient
            colors={["#43B9EA", "#1A73E8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="h-full w-full justify-center"
            style={{
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              elevation: 6,
            }}
          >
            <View className="flex items-center justify-center mt-16">
              {album ? (
                <>
                  <Image
                    source={{ uri: album.coverPic?.url }}
                    style={{
                      width: 180,
                      height: 180,
                      borderRadius: 20,
                      borderWidth: 3,
                      borderColor: "white",
                    }}
                  />
                  <Text className="text-white text-3xl mt-3 font-bold">
                    {album.title}
                  </Text>
                </>
              ) : (
                <Text className="text-white">Loading...</Text>
              )}
            </View>
          </LinearGradient>
        </View>

        {/* Genres Section */}
        <View className="px-6 mt-8">
          <Text className="text-white text-lg font-semibold mb-2">Genres</Text>
          <View className="flex-row flex-wrap gap-3">
            {album ? (
              album.genres.map((genre, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: genreColors[genre] || "#888",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {genre}
                  </Text>
                </View>
              ))
            ) : (
              <Text className="text-white">Loading...</Text>
            )}
          </View>
        </View>

        {/* Songs Section */}
        <View className="mt-10 px-6">
          <Text className="text-white text-xl font-semibold">Songs</Text>
          <TouchableOpacity
            className="mt-4 bg-[#3B82F6] flex-row items-center justify-center rounded-xl py-3 px-4 shadow-lg"
            onPress={() => router.push("/artists/SongForm")}
            style={{
              shadowColor: "#3B82F6",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
          >
            <AntDesign name="plus" size={20} color="white" />
            <Text className="ml-2 text-white font-medium">Add Song</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
