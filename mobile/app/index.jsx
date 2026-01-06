import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import { loadArtist, loadUser, saveUser } from "./redux/slices/AuthSlice";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export default function App() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // State to track the loading status of the authentication check
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadArtist());
  }, [dispatch]);
  const isAuthenticated = useAppSelector(
    (state) => state.auth.user.isAuthenticated
  );

  const isArtistAuthenticated = useAppSelector(
    (state) => state.auth.artist.isAuthenticated
  );

  useEffect(() => {
    // Wait for the state to load before performing the navigation
    if (isAuthenticated === null) return; // Skip if state is not yet loaded

    // Once the authentication status is determined, set loading to false
    setLoading(false);

    // If the user is authenticated, push them to the appropriate screen
    if (isAuthenticated) {
      router.push("/users"); // Redirect to the home screen or any other screen
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Wait for the state to load before performing the navigation
    if (isArtistAuthenticated === null) return; // Skip if state is not yet loaded
    console.log(isArtistAuthenticated);
    // Once the authentication status is determined, set loading to false
    setLoading(false);

    // If the user is authenticated, push them to the appropriate screen
    if (isArtistAuthenticated) {
      router.push("/artists"); // Redirect to the home screen or any other screen
    }
  }, [isArtistAuthenticated, router]);

  if (loading) {
    // Render a loading screen or splash screen while waiting for auth state
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-surface_a0">
        <Image
          source={require("../assets/images/adaptive-icon.png")}
          style={{ width: 300, height: 300 }}
        />
        <Text className="text-white text-2xl">Loading...</Text>
      </SafeAreaView>
    );
  }

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
      </View>
    </SafeAreaView>
  );
}
