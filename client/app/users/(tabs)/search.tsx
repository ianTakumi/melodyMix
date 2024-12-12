import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const genres = [
    { id: 1, name: "Pop", color: "#FAD02E" },
    { id: 2, name: "Rock", color: "#F28D35" },
    { id: 3, name: "Jazz", color: "#F5C7B5" },
    { id: 4, name: "Classical", color: "#6C8E8B" },
    { id: 5, name: "Hip-hop", color: "#E44A4A" },
    { id: 6, name: "Blues", color: "#61B6B6" },
    { id: 7, name: "Electronic", color: "#8E97FD" },
    { id: 8, name: "Reggae", color: "#9DCE5A" },
    { id: 9, name: "Folk", color: "#E0B0A3" },
    { id: 10, name: "Country", color: "#C8B6E2" },
  ];

  const topGenres = [
    { id: 1, name: "OPM", color: "#A3D9A5" },
    { id: 2, name: "Indie", color: "#D3B8A2" },
  ];

  return (
    <View className="flex-1 bg-black">
      <Text className="text-white font-serif font-bold text-5xl ml-3">
        Search
      </Text>
      <View className="mt-3 flex-row items-center bg-white rounded-lg px-4 py-2">
        <AntDesign name="search1" size={24} color="gray" />
        <TextInput
          className="ml-3 flex-1 text-base text-black placeholder-gray-400"
          placeholder="Artists, songs, or podcasts"
          placeholderTextColor="gray"
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
      </View>
      <Text className="text-white font-bold text-xl mt-5 ml-3 font-mono">
        Your top genres
      </Text>
      <FlatList
        data={topGenres}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 items-center justify-center m-2 p-12 rounded-lg"
            style={{ backgroundColor: item.color }}
          >
            <Text className="text-white font-semibold">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text className="text-white font-bold text-xl mt-5 ml-3 font-mono">
        Browse All
      </Text>
      <FlatList
        data={genres}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 items-center justify-center m-2 p-12 rounded-lg"
            style={{ backgroundColor: item.color }}
          >
            <Text className="text-white font-semibold">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
