import React, { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { Link } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { GestureResponderEvent } from "react-native";
import { auth } from "../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAppDispatch } from "./redux/hooks";
import { setUser } from "./redux/slices/UserSlice";
import { useRouter } from "expo-router";

const Signup = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phoneNumber: "",
    dob: "",
    role: "",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const { name, email, password, gender, phoneNumber, dob } = formData;
    if (!name || !email || !password || !gender || !phoneNumber || !dob) {
      setErrorMessage("Please fill in all the fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: GestureResponderEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axiosInstance
        .post("/auths/signup", formData, {
          headers: { "Content-Type": "application/json" },
        })
        .then();

      if (response.data.success) {
        setSuccessMessage("Registration successful!");
        console.log("Registration successful:", response.data);
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const firebaseSignIn = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
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
    <View style={styles.container} className="bg-surface_a0">
      <Text style={styles.title} className="text-white">
        Sign Up
      </Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#B3B3B3"
          className="bg-transparent border border-white rounded-lg mb-4 text-white "
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <TextInput
          className="bg-transparent border border-white rounded-lg mb-4 text-white "
          placeholder="Email"
          placeholderTextColor="#B3B3B3"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
        />
        <TextInput
          className="bg-transparent border border-white rounded-lg mb-4 text-white "
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#B3B3B3"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
        <View className="border border-white rounded-lg mb-4">
          <Picker
            selectedValue={formData.gender}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, gender: itemValue })
            }
            style={{ color: "gray", backgroundColor: "transparent" }} // Ensure text and background visibility
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Man" value="Man" />
            <Picker.Item label="Woman" value="Woman" />
            <Picker.Item label="Prefer not to say" value="Prefer not to say" />
          </Picker>
        </View>

        <TextInput
          className="bg-transparent border border-white rounded-lg mb-4 text-white "
          placeholder="Phone Number"
          placeholderTextColor="#B3B3B3"
          value={formData.phoneNumber}
          onChangeText={(text) =>
            setFormData({ ...formData, phoneNumber: text })
          }
          keyboardType="phone-pad"
        />
        <TextInput
          className="bg-transparent border border-white rounded-lg mb-4 text-white "
          placeholder="Date of Birth"
          placeholderTextColor="#B3B3B3"
          value={formData.dob}
          onChangeText={(text) => setFormData({ ...formData, dob: text })}
        />

        <TouchableOpacity
          style={styles.submitButton}
          className="bg-primary_a0"
          onPress={handleSubmit}
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
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <Link href="ArtistSignup" asChild>
        <TouchableOpacity>
          <Text style={styles.linkText}>Are you an artist? Sign up here</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  submitButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
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
