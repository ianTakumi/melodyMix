import "react-native-gesture-handler";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createNotifications } from "react-native-notificated";
const { NotificationsProvider } = createNotifications();
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { loadUser } from "./redux/slices/AuthSlice";

export default function Layout() {
  return (
    <>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NotificationsProvider>
            <Slot />
          </NotificationsProvider>
        </GestureHandlerRootView>
      </Provider>
    </>
  );
}
