import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import ProfilePicture from "../../components/ProfilePicture";
import { useRouter } from "expo-router";

const profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const handleRedirectToProfile = () => {
    router.push("users/updateProfile");
  };

  return (
    <LinearGradient
      className="flex-1"
      colors={["#675A72", "#403E44", "#282828"]}
      locations={[0, 0.3, 1]}
      start={{ x: 0, y: 0.1 }}
      dither={false}
      end={{ x: 0, y: 1 }}
    >
      <View className="mx-5">
        <View className="my-10  flex flex-row items-center">
          <ProfilePicture
            name={user.data?.name}
            imageUrl={user.data?.profile_picture.url}
            size={100}
          />
          <View className="ml-5">
            <Text className="text-white font-bold text-2xl mb-1">
              {user.data?.name}
            </Text>
            <Text className="text-white">15 following</Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-transparent border border-white rounded-full p-2 w-16 mx-2"
          onPress={handleRedirectToProfile}
        >
          <Text className="text-white text-center font-bold">Edit</Text>
        </TouchableOpacity>
        <View className="mt-10 mx-2">
          <Text className="text-white text-2xl font-bold">Playlists</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default profile;
