import { Slot } from "expo-router";
import { Provider } from "react-redux";
import store from "./redux/store";

// Import your global CSS file
import "../global.css";

export default function Layout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
