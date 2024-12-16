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
import { loadUser, saveUser } from "./redux/slices/AuthSlice";
import { useEffect } from "react";

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

  useEffect(() => {
    // Dispatch the loadUser action to check if a user is logged in
    dispatch(loadUser());
  }, [dispatch]);

  const isAuthenticated = useAppSelector(
    (state) => state.auth.user.isAuthenticated
  );

  useEffect(() => {
    // Wait for the state to load before performing the navigation
    if (isAuthenticated === null) return; // Skip if state is not yet loaded

    // If the user is authenticated, push them to the appropriate screen
    if (isAuthenticated) {
      router.push("/users"); // Redirect to the home screen or any other screen
    } else {
      router.push("/login"); // Redirect to the login screen if not authenticated
    }
  }, [isAuthenticated, router]);

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
                      user: response.data.user,
                      token: response.data.token,
                    })
                  );
                  router.push("/users");
                } else if (user.role === "admin") {
                  router.push("/admin");
                }
              } else if (response.data.artist) {
                const artist = response.data.artist;

                router.push("artists/");
              }
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
