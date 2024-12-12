import { Text, View, TouchableOpacity } from "react-native";

import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-backgroundColor ">
      <Text className="text-white text-4xl">Millions of Songs</Text>
      <Text className="text-white text-4xl mb-10">Free in MeloxyMix</Text>

      {/* Sign Up Button */}
      <Link href="/UserSignup" asChild>
        <TouchableOpacity className="w-full py-4 bg-purple-600 rounded-full mb-4">
          <Text className="text-center text-lg text-white font-semibold">
            Sign Up free
          </Text>
        </TouchableOpacity>
      </Link>

      {/* Google Button */}
      <TouchableOpacity className="w-full py-5 border-2 border-white rounded-full mb-4">
        <Text className="text-white text-center text-lg">
          Continue with Google
        </Text>
      </TouchableOpacity>

      {/* Facebook Button */}
      <TouchableOpacity className="w-full py-5 px-5 border-2 border-white rounded-full mb-8">
        <Text className="text-white text-center text-lg">
          Login with Facebook
        </Text>
      </TouchableOpacity>
      <Link href="/login">
        <Text className="text-white text-2xl">Log in</Text>
      </Link>

      <Link href="/users" asChild>
        <TouchableOpacity>
          <Text className="text-white text-lg">Go to User Screen</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
