import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(drawers)" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{ headerShown: false, animation: "simple_push" }}
      />
      <Stack.Screen
        name="updateProfile"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="createCategory"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack>
  );
}
