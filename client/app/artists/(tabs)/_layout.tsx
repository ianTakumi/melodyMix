import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
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
        name="albums"
        options={{
          title: "Albums",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="albums" size={24} color={color} />
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
        name="store"
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
    </Tabs>
  );
}
