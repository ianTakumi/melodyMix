import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axiosInstance from "../utils/AxiosInstance";

const ArtistSignup = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    setError("");

    if (!name || !email || !phoneNumber) {
      setError("All fields are required.");
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNumber)) {
      setError("Please enter a valid phone number (10 digits).");
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);

      const response = await axiosInstance.post("/artists/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setSuccessMessage("Registration Successful! Redirecting to Home...");

        setTimeout(() => {
          navigation.navigate("Home");
        }, 2000);
      }
    } catch (error) {
      setError("An error occurred while signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container} className="bg-surface_a0">
      <Text style={styles.title}>Artist Signup</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#B3B3B3"
        className="bg-transparent border border-white rounded-lg mb-4 text-white "
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="bg-transparent border border-white rounded-lg mb-4 text-white "
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#B3B3B3"
      />
      <TextInput
        className="bg-transparent border border-white rounded-lg mb-4 text-white "
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
        placeholderTextColor="#B3B3B3"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? (
        <Text style={styles.success}>{successMessage}</Text>
      ) : null}
      <TouchableOpacity
        style={[styles.button, loading ? styles.buttonDisabled : null]}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginVertical: 10,
    fontSize: 14,
  },
  success: {
    color: "green",
    marginVertical: 10,
    fontSize: 14,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#bbb",
  },
});

export default ArtistSignup;
