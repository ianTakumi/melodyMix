import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";

interface ProfilePictureProps {
  name?: string; // User's name
  imageUrl?: string; // Optional image URL (if user has uploaded an image)
  size?: number; // Avatar size, default is 80
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  name,
  imageUrl,
  size = 30,
}) => {
  const firstLetter = name?.charAt(0).toUpperCase(); // Get the first letter of the name

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: imageUrl ? "transparent" : "#8D67AB", // Conditionally set background color
        },
      ]}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }} // Display the user's uploaded image
          style={[
            styles.image,
            { width: 50, height: 50, borderRadius: size / 2 },
          ]}
        />
      ) : (
        <Text style={[styles.text, { fontSize: size / 2 }]}>{firstLetter}</Text> // Display the first letter if no image is uploaded
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    resizeMode: "cover", // Ensures the image scales properly
  },
});

export default ProfilePicture;
