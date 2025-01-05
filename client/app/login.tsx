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
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import axiosInstance from "../utils/AxiosInstance";
import { notifyToast } from "../utils/helpers";
import { saveArtist, saveUser } from "./redux/slices/AuthSlice";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
  const [passwordVisible, setPasswordVisible] = useState(false);

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
              notifyToast("Success", "Login successful!", "success");
              if (response.data.user) {
                const userObj = response.data.user;
                const userToken = response.data.token;
                const user = response.data.user;
                if (user.role === "customer") {
                  dispatch(
                    saveUser({
                      user: userObj,
                      token: userToken,
                    })
                  );
                  router.push("/users");
                } else if (user.role === "admin") {
                  router.push("/admin");
                }
              } else if (response.data.artist) {
                const artistObj = response.data.artist;
                const artistToken = response.data.token;
                dispatch(saveArtist({ artist: artistObj, token: artistToken }));
                router.push("artists/");
              }
            } else if (response.status === 400) {
              notifyToast("Warning", response.data.message, "warning");
            }
          });
      }
    } catch (e: any) {
      console.log(e);
      notifyToast("Warning", "Invalid credentials", "warning");
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

      {loading && (
        <ActivityIndicator
          size={80}
          color="#4CAF50"
          className="absolute top-1/2 left-1/2"
        />
      )}

      <View className="w-full">
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

        <Text className="text-base text-white mx-5 mb-1 mt-3">Password</Text>
        <View className="relative mx-5">
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-transparent border border-white rounded-lg mb-1 text-white w-full pr-10"
                placeholder="Enter your password"
                secureTextEntry={!passwordVisible}
                placeholderTextColor="#B3B3B3"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Feather
              name={passwordVisible ? "eye" : "eye-off"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text className="text-red-500 mx-5">{errors.password.message}</Text>
        )}

        <TouchableOpacity
          className="bg-primary_a0 mx-5 mt-5 py-3 rounded-lg items-center"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-bold text-lg">Submit</Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row justify-center space-x-4 mt-10 gap-6">
        <Image
          source={require("../assets/images/facebook.png")}
          className="w-8 h-8"
        />
        <Image
          source={require("../assets/images/google.png")}
          className="w-8 h-8"
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
