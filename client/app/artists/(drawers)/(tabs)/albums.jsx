import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAppSelector } from "../../../redux/hooks";
import { useRouter } from "expo-router";
import axiosInstance from "../../../../utils/AxiosInstance";
import { Swipeable } from "react-native-gesture-handler";
import { notifyToast } from "../../../../utils/helpers";
export default function AlbumPage() {
  const artist = useAppSelector((state) => state.auth.artist);
  const router = useRouter();
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    await axiosInstance
      .get(`/albums/${artist.data._id}`)
      .then((res) => {
        setAlbums(res.data.albums);
        console.log(res.data.albums);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleDelete = async (albumId) => {
    await axiosInstance.delete(`/albums/${albumId}`).then((res) => {
      console.log(res.data);
      notifyToast("Success", "Successfully Deleted", "success");
      fetchAlbums();
    });
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-[#121212]">
      {/* Content Section */}
      <View className="w-4/12">
        <TouchableOpacity
          className="bg-primary_a0 flex-row items-center justify-center rounded-xl py-2 px-5"
          onPress={() => router.push("/artists/AlbumForm")}
        >
          <AntDesign name="plus" size={20} color="black" />
          <Text className="ml-1 text-black font-medium">Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="mt-5">
        {albums.map((album, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push({
                pathname: "/artists/SingleAlbum",
                params: { id: album._id },
              })
            }
          >
            <Swipeable
              renderRightActions={() => (
                <View className="flex-row items-center">
                  <TouchableOpacity
                    className="bg-blue-500 rounded-l-xl px-4 py-3"
                    onPress={() =>
                      router.push({
                        pathname: "/artists/AlbumForm",
                        params: { id: album._id },
                      })
                    }
                  >
                    <Text className="text-white font-bold">Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-red-500 rounded-r-xl px-4 py-3"
                    onPress={() => handleDelete(album._id)}
                  >
                    <Text className="text-white font-bold">Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            >
              <View className="flex-row items-center justify-between bg-[#1E1E1E] rounded-xl p-3 my-2">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: album.coverPic.url }}
                    className="w-20 h-20 rounded-xl"
                  />
                  <View className="ml-3">
                    <Text className="text-white text-lg font-bold">
                      {album.title}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {album.release_date}
                    </Text>
                  </View>
                </View>
              </View>
            </Swipeable>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
