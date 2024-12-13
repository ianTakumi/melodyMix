import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

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
    </Tabs>
  );
}
