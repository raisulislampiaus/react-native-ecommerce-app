import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import Header from "./Shared/Header";
import Toast from "react-native-toast-message";

import { NavigationContainer } from "@react-navigation/native";
import Main from "./Navigators/Main";

import { Provider } from "react-redux";
import store from "./Redux/store";

import Auth from "./Context/store/Auth";

LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
