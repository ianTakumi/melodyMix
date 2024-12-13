import { registerRootComponent } from "expo";
import React from "react";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import App from "./app/index";

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(RootApp);
