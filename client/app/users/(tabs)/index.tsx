import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { useAppSelector } from "../../redux/hooks";
import ProfilePicture from "../../../components/ProfilePicture";
import { createNotifications } from "react-native-notificated";
import { RootState } from "../../redux/store";

export default function IndexPage() {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { useNotifications } = createNotifications({
    defaultStylesSettings: {
      darkMode: true,
    },
  });

  const { notify } = useNotifications();

  const handleNotify = () => {
    notify("success", {
      params: {
        title: "Hello",
        description: "Wow, that was easy!",
      },
    });
  };
  return (
    <LinearGradient
      className="flex-1"
      colors={["#121212", "#282828", "#121212"]} // Define the gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView className="flex-1 px-4">
        {/* Header Section */}
        <View className="pl-2 pt-10 flex flex-row justify-between items-center">
          <ProfilePicture name={user.data?.name} imageUrl={""} />

          <Text className="text-white font-bold font-mono text-3xl">
            Made for You
          </Text>

          <View className="flex-row justify-center items-center gap-5 space-x-4">
            <MaterialIcons name="notifications-none" size={32} color="white" />
            <Entypo name="back-in-time" size={32} color="white" />
            <Feather name="settings" size={32} color="white" />
          </View>
        </View>
        <ScrollView className="mt-8">
          <Text className="text-white font-mono text-2xl font-bold">
            To get you started
          </Text>
          <ScrollView
            horizontal
            style={styles.imageContainer}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../../assets/images/eheads.jpg")}
              />
              <Text style={styles.textGray} className="font-serif">
                Catch the latest playlist of Eraserheads's album
              </Text>
            </View>
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../../assets/images/silentSanctuary.jpg")}
              />
              <Text style={styles.textGray} className="font-serif">
                Relax listening to Silent Sancuatry's Album
              </Text>
            </View>
          </ScrollView>
        </ScrollView>
        {/* Content Section */}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    width: 170,
    height: 170,
    marginRight: 30,
    marginBottom: 5,
  },
  textGray: {
    color: "#A8A8A8",
    marginTop: 8,
    fontSize: 12,
    flexShrink: 1,
    textAlign: "center",
  },
  card: {
    width: 170, // Matches the image width
    marginRight: 30,
  },
});
