import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { auth } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/UserSlice"; // Adjust the import path based on your file structure

import axiosInstance from "../utils/AxiosInstance";
import { setArtist } from "./redux/slices/ArtistSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);

  interface LoginFormData {
    email: string;
    password: string;
  }

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    setLoading(true);
    try {
      // Login first to the firebase
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // If valid then login to the db
      if (user) {
        const response = await axiosInstance
          .post("/auths/login", data)
          .then((response) => {
            if (response.status === 200) {
              if (response.data.user) {
                const user = response.data.user;
                if (user.role === "customer") {
                  dispatch(setUser(user));
                  router.push("/users");
                } else if (user.role === "admin") {
                  router.push("/admin");
                }
              } else if (response.data.artist) {
                const artist = response.data.artist;
                dispatch(setArtist(artist));
                router.push("artists/");
              }
            }
          });
      }
    } catch (e: any) {
      console.log(e);
      alert("Login unsuccessful");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-surface_a0">
      <Image
        source={require("../assets/images/adaptive-icon.png")}
        style={{ width: 300, height: 300 }}
      />

      <Text className="text-white font-serif text-4 text-2xl mb-3 text-center">
        Login to Melody Mix
      </Text>

      {/* Loading Spinner */}
      {loading && (
        <ActivityIndicator
          size={80} // Larger spinner size
          color="#4CAF50"
          style={styles.spinner}
        />
      )}

      <View className="w-full">
        {/* Email Input */}
        <Text className="text-base text-white mx-5 mb-1">Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: "Please enter a valid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-transparent border border-white rounded-lg mb-1 text-white mx-5"
              placeholder="Enter your email"
              onBlur={onBlur}
              placeholderTextColor="#B3B3B3"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500 mx-5">{errors.email.message}</Text>
        )}

        {/* Password Input */}
        <Text className="text-base text-white mx-5 mb-1 mt-3">Password</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-transparent border border-white rounded-lg mb-1 mx-5 text-white "
              placeholder="Enter your password"
              secureTextEntry
              placeholderTextColor="#B3B3B3"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text className="text-red-500 mx-5">{errors.password.message}</Text>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-primary_a0 mx-5"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Icons */}
      <View className="flex flex-row justify-center space-x-4 mt-10 gap-6">
        <Image
          source={require("../assets/images/facebook.png")}
          style={styles.icon}
        />
        <Image
          source={require("../assets/images/google.png")}
          style={styles.icon}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: 0, // Half of the spinner size
    marginTop: -40, // Half of the spinner size
  },
});
