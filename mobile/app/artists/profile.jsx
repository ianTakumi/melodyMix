import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import ProfilePicture from "../../components/ProfilePicture";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const data = [
  {
    id: "1",
    name: "EraserArms",

    url: require("../../assets/images/eheads.jpg"),
  },
  {
    id: "2",
    name: "Sugar not free",

    url: require("../../assets/images/sugarFree.jpg"),
  },
  {
    id: "3",
    name: "Noisy Sanctuary",

    url: require("../../assets/images/silentSanctuary.jpg"),
  },
  {
    id: "4",
    name: "Sugar not free",

    url: require("../../assets/images/sugarFree.jpg"),
  },
  {
    id: "5",
    name: "Noisy Sanctuary",

    url: require("../../assets/images/silentSanctuary.jpg"),
  },
  {
    id: "6",
    name: "Noisy Sanctuary",

    url: require("../../assets/images/silentSanctuary.jpg"),
  },
];

const renderItem = ({ item }) => (
  <View className="m-4 items-center">
    {/* Image Section */}
    <View className="w-24 h-24 rounded-full overflow-hidden">
      <Image source={item.url} className="w-full h-full object-cover" />
    </View>

    {/* Text Section */}
    <Text className="text-white mt-2 text-base">{item.name}</Text>
  </View>
);

const Profile = () => {
  const artist = useAppSelector((state) => state.auth.artist);
  const router = useRouter();

  const handleRedirectToProfile = () => {
    router.push("/artists/updateProfile");
  };

  return (
    <SafeAreaView className="bg-[#121212] flex-1">
      <LinearGradient
        className="flex-1 absolute inset-0"
        colors={["#B599D3", "#121212"]}
        locations={[0, 0.3]}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0, y: 0.49 }}
      />

      <View className="mx-5 relative z-10">
        {/* Profile container */}
        <View className="my-10 flex flex-row items-center">
          <View className="relative">
            <ProfilePicture
              name={artist.data?.name}
              imageUrl={artist.data.profile_picture.url}
              size={100}
            />
            <TouchableOpacity className="absolute bottom-0 right-0 p-2">
              <AntDesign name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="ml-5">
            <Text className="text-white font-bold text-2xl mb-1">
              {artist.data?.name}
            </Text>
            <Text className="text-white">100000 followers</Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-transparent border border-white rounded-full p-2 w-16 mx-2"
          onPress={handleRedirectToProfile}
        >
          <Text className="text-white text-center font-bold">Edit</Text>
        </TouchableOpacity>
        {/* Album container */}
        <View className="flex flex-col items-center justify-center ">
          <View className="mt-10 ">
            <Text className="text-white text-2xl font-bold">Albums</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={3}
            contentContainerStyle={{ alignItems: "center" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
