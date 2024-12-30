import React, { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { Link } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { auth } from "../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAppDispatch } from "./redux/hooks";
import { setUser } from "./redux/slices/UserSlice";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Platform } from "react-native";

const Signup = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
      phoneNumber: "",
      dob: new Date(),
      role: "",
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dob, setDob] = useState("Date of Birth");

  const handleDateChange = (date: Date) => {
    setDob(date.toDateString());
    setValue("dob", date);
    setShowDatePicker(false);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axiosInstance
        .post("/auths/signup", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then();

      if (response.data.success) {
        setSuccessMessage("Registration successful!");
        console.log("Registration successful:", response.data);
        await createUserWithEmailAndPassword(auth, data.email, data.password);

        const firebaseSignIn = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        dispatch(setUser(response.data.user));
        router.push("/users");
      } else {
        setErrorMessage(response.data.message || "Registration failed");
        console.error("Registration failed:", response.data.message);
      }
    } catch (error) {
      setErrorMessage(
        "Error during registration: " +
          (error instanceof Error ? error.message : "")
      );
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-surface_a0 flex-1 ">
      <View className="flex-1 justify-center items-center p-5">
        <Text style={styles.title} className="text-white font-bold mb-2">
          Sign Up
        </Text>
        <View className="w-full">
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor="#B3B3B3"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                />
                {error && (
                  <Text style={styles.errorMessage}>{error.message}</Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#B3B3B3"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                />
                {error && (
                  <Text style={styles.errorMessage}>{error.message}</Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required", minLength: 6 }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor="#B3B3B3"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                />
                {error && (
                  <Text style={styles.errorMessage}>{error.message}</Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Man" value="Man" />
                  <Picker.Item label="Woman" value="Woman" />
                  <Picker.Item
                    label="Prefer not to say"
                    value="Prefer not to say"
                  />
                </Picker>
              </View>
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            rules={{ required: "Phone number is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  placeholder="Phone Number"
                  placeholderTextColor="#B3B3B3"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                />
                {error && (
                  <Text style={styles.errorMessage}>{error.message}</Text>
                )}
              </>
            )}
          />

          {/* Date Picker */}
          {Platform.OS === "web" ? (
            <Controller
              control={control}
              name="dob"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Date of Birth"
                  placeholderTextColor="#B3B3B3"
                  value={dob}
                  onFocus={() => setShowDatePicker(true)}
                />
              )}
            />
          ) : (
            <View style={styles.datePickerContainer}>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>{dob}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                maximumDate={new Date()}
                onConfirm={(date) => handleDateChange(date)}
                onCancel={() => setShowDatePicker(false)}
              />
            </View>
          )}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>

        {successMessage && (
          <Text style={styles.successMessage}>{successMessage}</Text>
        )}
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}

        <Link href="ArtistSignup" asChild>
          <TouchableOpacity>
            <Text style={styles.linkText}>Are you an artist? Sign up here</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    color: "white",
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    height: 40,
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
  picker: {
    color: "gray",
    backgroundColor: "transparent",
    padding: 10,
  },
  datePickerContainer: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
  },
  datePickerButton: {
    marginLeft: 5,
    padding: 10,
  },
  dateText: {
    color: "white",
  },
  submitButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#1E90FF",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#1E90FF",
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop: 20,
  },
  successMessage: {
    color: "green",
    fontSize: 16,
    marginTop: 10,
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});

export default Signup;
