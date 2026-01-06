import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ProfilePicturePickerModal = ({ visible, onClose, onImagePicked }) => {
  const pickImage = async (fromCamera) => {
    let result;
    try {
      if (fromCamera) {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        onImagePicked(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    } finally {
      onClose(); // Ensure modal closes even if an error occurs
    }
  };

  if (!visible) return null; // Hide component when `visible` is false

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 flex-1 justify-center items-center bg-black/80">
      <View className="bg-white p-10 w-[100%] max-w-lg rounded-2xl shadow-lg">
        <Text className="text-lg font-bold text-gray-900 mb-4">
          Change profile photos
        </Text>

        <TouchableOpacity
          onPress={() => pickImage(false)}
          className="p-4 border-b border-gray-300"
        >
          <Text className="text-gray-900 text-lg">Choose photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => pickImage(true)}
          className="p-4 border-b border-gray-300"
        >
          <Text className="text-gray-900 text-lg">Take photo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} className="p-4 mt-2">
          <Text className="text-red-500 text-lg text-center">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePicturePickerModal;
