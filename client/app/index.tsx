import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-surface_a0">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("../assets/images/adaptive-icon.png")}
          style={{ width: 300, height: 300 }}
        />

        <Text className="text-white text-4xl">Millions of Songs</Text>
        <Text className="text-white text-4xl mb-10">Free in Meloxy Mix</Text>

        {/* Sign Up Button */}
        <Link href="/UserSignup" asChild>
          <TouchableOpacity className="w-full py-4 bg-primary_a0 rounded-full mb-4">
            <Text className="text-center text-lg text-white font-semibold">
              Sign Up free
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Google Button */}
        <TouchableOpacity className="w-full py-5 border-2 border-white rounded-full mb-4 flex-row items-center justify-center">
          <Image
            source={require("../assets/images/google.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text className="text-white text-lg ml-3">Continue with Google</Text>
        </TouchableOpacity>

        {/* Facebook Button */}
        <TouchableOpacity className="w-full py-5 border-2 border-white rounded-full mb-8 flex-row items-center justify-center">
          <Image
            source={require("../assets/images/facebook.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text className="text-white text-lg ml-3">Login with Facebook</Text>
        </TouchableOpacity>

        <Link href="/login">
          <Text className="text-white text-2xl">Log in</Text>
        </Link>

        <Link href="/users" asChild>
          <TouchableOpacity>
            <Text className="text-white text-lg">Go to User Screen</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/artist" asChild>
          <TouchableOpacity>
            <Text className="text-white text-lg">Go to artists Screen</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
