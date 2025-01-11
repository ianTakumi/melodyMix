import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Drawer } from "expo-router/drawer";
import { MaterialIcons, Entypo, Feather, AntDesign } from "@expo/vector-icons";
import { Link, usePathname, useRouter } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import ProfilePicture from "../../../components/ProfilePicture";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { logoutUser } from "../../redux/slices/AuthSlice";
import { router } from "expo-router";
import { notifyToast } from "../../../utils/helpers";

const getHeaderTitle = (pathTitle) => {
  switch (pathTitle) {
    case "":
      return "Dashboard";
    case "store":
      return "My Store";
    case "albums":
      return "My Albums";
  }
};

// Custom Header with Profile Picture and Icon Buttons
const CustomHeader = ({ navigation }) => {
  const artist = useAppSelector((state) => state.auth.artist);
  const pathName = usePathname();
  const pathTitle = pathName.split("/").slice(2).join("/");
  return (
    <View className="pl-4 pt-10 pb-5 flex flex-row justify-between items-center bg-[#121212]">
      {/* Profile Picture */}
      <View className="flex flex-row items-center gap-4">
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          className="mr-0"
        >
          <ProfilePicture name={artist.data?.name} imageUrl="" size={40} />
          {/* Replace with actual name and image */}
        </TouchableOpacity>
        <Text className="text-white font-bold font-mono text-3xl ">
          {getHeaderTitle(pathTitle)}
        </Text>
      </View>
    </View>
  );
};

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  const artist = useAppSelector((state) => state.auth.artist);
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
        <Link href="/artists/profile">
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
        drawerStyle: { backgroundColor: "#141414" }, // Optional: Make the drawer background black\
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer content
    ></Drawer>
  );
};

export default Layout;
