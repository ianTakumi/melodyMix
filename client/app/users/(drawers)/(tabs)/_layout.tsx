import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Your Library",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="folder-music" size={24} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tabs.Screen
        name="Store"
        options={{
          title: "Store",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="store" size={24} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tabs.Screen
        name="premium"
        options={{
          title: "Premium",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="workspace-premium" size={24} color={color} />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
        }}
      />
    </Tabs>
  );
}
