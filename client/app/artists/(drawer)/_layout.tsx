import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Drawer } from "expo-router/drawer";
import { MaterialIcons, Entypo, Feather, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import ProfilePicture from "../../../components/ProfilePicture";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { logoutUser } from "../../redux/slices/AuthSlice";
import { router } from "expo-router";
import { notifyToast } from "../../../utils/helpers";

// Define the type for navigation prop
type CustomHeaderProps = {
  navigation: DrawerNavigationProp<any, any>;
};

// Custom Header with Profile Picture and Icon Buttons
const CustomHeader = ({ navigation }: CustomHeaderProps) => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <View className="pl-4 pt-10 flex flex-row justify-between items-center bg-[#141414]">
      {/* Profile Picture */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <ProfilePicture name={user.data?.name} imageUrl="" size={40} />
        {/* Replace with actual name and image */}
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-white font-bold font-mono text-3xl">
        Made for You
      </Text>

      {/* Right Icons */}
      <View className="flex-row justify-center items-center gap-5 space-x-4">
        <MaterialIcons name="notifications-none" size={32} color="white" />
        <Entypo name="back-in-time" size={32} color="white" />
        <Feather name="settings" size={32} color="white" />
      </View>
    </View>
  );
};

// Custom Drawer Content
const CustomDrawerContent = (props: any) => {
  const artist = useAppSelector((state: RootState) => state.auth.artist);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    console.log("Successfully log out");
    dispatch(logoutUser());
    notifyToast("Success", "Logout Successfully", "success");
    router.push("login");
  };
  return (
    <ScrollView
      {...props}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#141414", // Drawer background color
      }}
    >
      {/* Custom content inside the Drawer */}

      <TouchableOpacity>
        <Link href="/users/profile">
          <View className="p-4 flex flex-row items-center mt-3">
            <ProfilePicture name={artist.data?.name} size={50} />
            <View className="ml-4">
              <Text className="text-white">{artist.data?.name}</Text>
              <Text className="text-gray-400">View profile</Text>
            </View>
          </View>
        </Link>
      </TouchableOpacity>

      {/* break line */}
      <View className="border-b border-[#353535]"></View>

      {/* Main content */}
      <View className="mx-5 my-6 ">
        <View className="flex flex-row items-center mb-6">
          <Entypo
            name="back-in-time"
            size={25}
            color="white"
            className="mr-5"
          />
          <Text className="text-white font-bold text-xl ">Recents</Text>
        </View>
        <View className="flex flex-row items-center mb-6">
          <AntDesign name="setting" size={24} color="white" className="mr-5" />
          <Text className="text-white font-bold text-xl ">Settings</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <View className="flex flex-row items-center">
            <AntDesign name="logout" size={24} color="white" className="mr-5" />
            <Text className="text-white font-bold text-xl ">Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Main Layout with Drawer
const Layout = () => {
  return (
    <Drawer
      screenOptions={{
        header: (props) => <CustomHeader {...props} />, // Use the custom header
        drawerContentStyle: { backgroundColor: "#1F1F1F" }, // Drawer background color
        drawerStyle: { backgroundColor: "#141414" }, // Optional: Make the drawer background black
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer content
    >
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
        }}
      />
    </Drawer>
  );
};

export default Layout;
