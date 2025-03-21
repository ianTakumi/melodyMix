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
        name="ProductDetail"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Carts"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Checkout"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Orders"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="OrderDetail"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack>
  );
}
