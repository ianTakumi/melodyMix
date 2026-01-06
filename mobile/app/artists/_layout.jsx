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
      <Stack.Screen
        name="AlbumForm"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="SingleAlbum"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="SongForm"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="ProductForm"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="EditProductForm"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Orders"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="EditOrder"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack>
  );
}
