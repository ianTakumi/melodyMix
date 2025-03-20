import React from "react";
import axiosInstance from "../../utils/AxiosInstance";
import { useForm, Controller } from "react-hook-form";
import { genres, notifyToast } from "../../utils/helpers";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAppSelector } from "../redux/hooks";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export default function SongForm() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      cover: "",
      genres: [],
      release_date: "",
    },
  });

  const { id } = useLocalSearchParams();
  const router = useRouter();
  const artist = useAppSelector((state) => state.auth.artist);
  const coverImage = watch("cover");

  const onSubmit = async (data) => {
    console.log("Submititng song");
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("artistId", artist.data._id);
    formData.append("release_date", data.release_date);

    // Convert selected genre keys to their respective values
    const selectedGenres = data.genres
      .split(",") // Assuming genres are stored as a comma-separated string
      .map((key) => genres.find((g) => g.key === key)?.value) // Get the genre name
      .filter(Boolean); // Remove undefined values

    formData.append("genres", selectedGenres.join(","));

    // Append cover image file
    if (data.cover) {
      const coverUri = data.cover.replace("file://", "");
      formData.append("cover", {
        uri: coverUri,
        name: "cover.jpg", // Change the name accordingly
        type: "image/jpeg", // Adjust MIME type if needed
      });
    }

    // Append MP3 file
    if (data.mp3File) {
      formData.append("mp3File", {
        uri: data.mp3File.uri,
        name: data.mp3File.name,
        type: data.mp3File.mimeType,
      });
    }

    console.log("Form data:", formData);

    await axiosInstance
      .post("/songs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.status === 201) {
          notifyToast(
            "Song Created",
            "Song has been created successfully",
            "success"
          );
          router.back();
        }
      })
      .catch((err) => {
        notifyToast(
          "Error",
          "An error occurred while creating the song",
          "error"
        );
        console.log("Error creating song:", err.message);
      });
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setValue("cover", result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView>
        <View className="relative h-56">
          <LinearGradient
            colors={["#43B9EA", "#1A73E8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="h-full w-full justify-center"
            style={{
              height: "100%",
              width: "100%",
              borderBottomRightRadius: 9999,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
            }}
          >
            <Text className="absolute top-28 left-6 text-white text-2xl font-bold self-start">
              {id ? "Edit Song" : "Add Song"}
            </Text>
          </LinearGradient>
        </View>

        <View className="mt-6 px-5">
          <Text className="text-white text-lg font-semibold">Title</Text>
          <Controller
            control={control}
            name="title"
            rules={{ required: "Album title is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-800 text-white p-3 rounded-lg mt-2"
                placeholder="Song Title"
                placeholderTextColor="#aaa"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {errors.title && (
            <Text className="text-red-500 mt-2">{errors.title.message}</Text>
          )}
        </View>

        <View className="mt-6 px-5">
          <Text className="text-white text-lg font-semibold">Genres</Text>
          <Controller
            control={control} // This comes from useForm()
            name="genres" // Field name
            rules={{ required: "Genre is required" }}
            render={({ field: { onChange, value } }) => (
              <SelectList
                data={genres} // Your list of genres
                setSelected={onChange} // Updates form state
                boxStyles={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                }}
                inputStyles={{ color: "white" }} // Input text
                dropdownStyles={{ backgroundColor: "#1F2937" }}
                dropdownTextStyles={{ color: "white" }}
                badgeTextStyles={{ color: "white" }}
                checkBoxStyles={{ borderColor: "white", tintColor: "white" }}
                searchPlaceholder="Search..." // Custom placeholder text
                searchPlaceholderTextColor="white" // Placeholder color
              />
            )}
          />

          {errors.genres && (
            <Text className="text-red-500 mt-2">{errors.genres.message}</Text>
          )}
        </View>

        <View className="mt-6 px-5">
          <Text className="text-white text-lg font-semibold">Song</Text>
          <Controller
            control={control} // From useForm()
            name="mp3File"
            rules={{ required: "MP3 file is required" }}
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity
                  onPress={async () => {
                    let result = await DocumentPicker.getDocumentAsync({
                      type: "audio/mpeg", // MP3 files
                      copyToCacheDirectory: false,
                    });

                    if (result.canceled || !result.assets) return;

                    const { name, uri, mimeType, size } = result.assets[0];
                    onChange({ name, uri, mimeType, size }); // Update form state
                  }}
                  className="mt-2 bg-green-500 p-3 rounded-lg"
                >
                  <Text className="text-white text-center">
                    {value ? "Replace MP3 File" : "Pick an MP3 File"}
                  </Text>
                </TouchableOpacity>

                {value && (
                  <View className="mt-3 bg-gray-800 p-4 rounded-lg">
                    <Text className="text-white">📁 {value.name}</Text>
                    <Text className="text-gray-400 text-sm">
                      {(value.size / 1024).toFixed(2)} KB
                    </Text>
                  </View>
                )}

                {errors.mp3File && (
                  <Text className="text-red-500 mt-2">
                    {errors.mp3File.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>
        <View className="mt-6 px-5">
          <Text className="text-white text-lg font-semibold">
            Cover Picture
          </Text>
          <TouchableOpacity
            onPress={handleImagePick}
            className="mt-2 bg-blue-500 p-3 rounded-lg"
          >
            <Text className="text-white text-center">Pick an Image</Text>
          </TouchableOpacity>
          {coverImage && (
            <Image
              source={{ uri: coverImage }}
              className="mt-3 w-full h-40 rounded-lg"
            />
          )}

          {errors.cover && (
            <Text className="text-red-500 mt-2">{errors.cover.message}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="mt-6 bg-green-500 p-4 rounded-lg px-10 mx-5"
        >
          <Text className="text-white text-center text-lg font-semibold">
            {id ? "Update Album" : "Create Album"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
