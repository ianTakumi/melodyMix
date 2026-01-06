import { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import axiosInstance from "../../utils/AxiosInstance";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAppSelector } from "../redux/hooks";
import { genres, notifyToast } from "../../utils/helpers";

export default function AlbumForm() {
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

  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const coverImage = watch("cover");
  const artist = useAppSelector((state) => state.auth.artist);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const onSubmit = async (data) => {
    console.log(selectedGenres);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("release_date", new Date(data.release_date).toISOString()); // Ensures correct date format
    formData.append("artistId", artist.data._id);
    formData.append("genres", selectedGenres);
    console.log(formData);
    // Append cover image
    if (data.cover) {
      const imageUri = data.cover;
      const filename = imageUri.split("/").pop();

      // Get file extension
      const ext = filename.split(".").pop();
      const type = `image/${ext}`; // Generate MIME type

      formData.append("cover", {
        uri: imageUri,
        name: filename,
        type: type,
      });
    }
    await axiosInstance
      .post("/albums", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 201) {
          notifyToast("Success", res.data.message, "success");
          router.push("/artists/(drawers)/(tabs)/albums");
        }
      });
  };

  const fetchAlbum = async () => {
    await axiosInstance.get(`/albums/single/${id}`).then((res) => {
      console.log(res.data);
      const album = res.data.data;
      console.log(album);

      reset({
        title: album.title || "",
        release_date: album.release_date || "",
        cover: album.cover.url || "",
      });
      const selectedGenreKeys = genres
        .filter((g) => album.genres.includes(g.value))
        .map((g) => g.key);

      // setSelectedGenres(selectedGenreKeys);
      setDate(album.release_date);
    });
  };

  useEffect(() => {
    if (id) {
      fetchAlbum();
    }
  }, [id]);

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

  const handleSelect = (selected) => {
    setSelectedGenres(selected);
    setValue("genres", selected, { shouldValidate: true });
  };

  useEffect(() => {
    register("genres", {
      required: "Please select at least one genre",
      validate: (value) =>
        value.length > 0 || "Please select at least one genre",
    });

    register("release_date", {
      required: "Release date is required",
    });

    register("cover", {
      required: "Cover image is required",
    });
  }, [register]);

  return (
    <SafeAreaView className="flex-1  bg-[#121212]">
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
              {id ? "Edit Album" : "Create Album"}
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
                placeholder="Album Title"
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

        <View className="mt-6 px-5">
          <Text className="text-white text-lg font-semibold">Release Date</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="mt-2 bg-gray-800 p-3 rounded-lg flex-row items-center justify-center"
          >
            {date ? (
              <Text className="text-white text-center">
                {new Date(date).toDateString()}
              </Text>
            ) : (
              <>
                <FontAwesome name="calendar" size={24} color="white" />
                <Text className="text-white text-center ml-2">Select Date</Text>
              </>
            )}
          </TouchableOpacity>

          {errors.release_date && (
            <Text className="text-red-500 mt-2">
              {errors.release_date.message}
            </Text>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={date ? new Date(date) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  const formattedDate = selectedDate.toISOString();
                  setDate(formattedDate);
                  setValue("release_date", formattedDate, {
                    shouldValidate: true,
                  });
                }
              }}
            />
          )}
        </View>

        <View className="mt-6 px-5">
          <Text className="text-white text-lg font-semibold">Genres</Text>
          <MultipleSelectList
            setSelected={handleSelect}
            data={genres}
            save="value"
            boxStyles={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
            inputStyles={{ color: "white" }}
            dropdownStyles={{ backgroundColor: "#1F2937" }}
            dropdownTextStyles={{ color: "white" }}
            badgeTextStyles={{ color: "white" }}
            checkBoxStyles={{ borderColor: "white", tintColor: "white" }}
            placeholder="Select genres"
            defaultOption={selectedGenres}
          />

          {errors.genres && (
            <Text className="text-red-500 mt-2">{errors.genres.message}</Text>
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
