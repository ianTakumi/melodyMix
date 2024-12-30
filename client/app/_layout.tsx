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
export default function Layout() {
  console.log("STRIPE_PUBLISHABLE_KEY:", process.env.STRIPE_PUBLISHABLE_KEY);
  return (
    <>
      <StatusBar hidden={true} />
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StripeProvider publishableKey={process.env.STRIPE_PUBLISHABLE_KEY}>
            <NotificationsProvider>
              <Slot />
            </NotificationsProvider>
          </StripeProvider>
        </GestureHandlerRootView>
      </Provider>
    </>
  );
}
