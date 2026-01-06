import "react-native-gesture-handler";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createNotifications } from "react-native-notificated";
const { NotificationsProvider } = createNotifications();
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from "react-native";
import { SQLiteProvider } from "expo-sqlite";
import { initCartDB } from "../utils/SQlite/cartDB";
import * as Notifications from "expo-notifications";
import { NotificationProvider } from "../context/NotificationContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Layout() {
  return (
    <>
      <NotificationProvider>
        <SQLiteProvider databaseName="cart.db" onInit={initCartDB}>
          <StatusBar hidden={true} />
          <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StripeProvider
                publishableKey={process.env.STRIPE_PUBLISHABLE_KEY}
              >
                <NotificationsProvider>
                  <Slot />
                </NotificationsProvider>
              </StripeProvider>
            </GestureHandlerRootView>
          </Provider>
        </SQLiteProvider>
      </NotificationProvider>
    </>
  );
}
