import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../utils/AxiosInstance";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../FirebaseConfig";

// Define the type for your form values
type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

const ArtistSignup = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>(); // Use the typed form values
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const response = await axiosInstance.post("/auths/artistSignup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setSuccessMessage("Registration Successful! Redirecting to Home...");
        await createUserWithEmailAndPassword(auth, data.email, data.password);

        const firebaseSignIn = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
      }
    } catch (error) {
      alert("An error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container} className="bg-surface_a0">
      <Text style={styles.title}>Artist Signup</Text>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Name"
            placeholderTextColor="#B3B3B3"
            className="bg-transparent border border-white rounded-lg mb-4 text-white"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="name"
        rules={{ required: "Name is required" }}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-transparent border border-white rounded-lg mb-4 text-white"
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            placeholderTextColor="#B3B3B3"
          />
        )}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Please enter a valid email address",
          },
        }}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-transparent border border-white rounded-lg mb-4 text-white"
            placeholder="Phone Number"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            placeholderTextColor="#B3B3B3"
          />
        )}
        name="phoneNumber"
        rules={{
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Please enter a valid phone number (10 digits)",
          },
        }}
      />
      {errors.phoneNumber && (
        <Text style={styles.error}>{errors.phoneNumber.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-transparent border border-white rounded-lg mb-4 text-white"
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            placeholderTextColor="#B3B3B3"
          />
        )}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
        }}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {successMessage && <Text style={styles.success}>{successMessage}</Text>}

      <TouchableOpacity
        style={[styles.button, loading ? styles.buttonDisabled : null]}
        className="bg-primary_a0"
        onPress={handleSubmit(onSubmit)}
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
