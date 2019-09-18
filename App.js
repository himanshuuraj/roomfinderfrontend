import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import { Scene, Router, Actions, Reducer } from "react-native-router-flux";

import { Provider } from "react-redux";
import store from "./store";
import { Stack } from "react-native-router-flux";
import HomePage from "./src/components/home";
import LoginPage from "./src/pages/login";
import FilterPage from "./src/pages/filter";
import RegisterationPage from "./src/pages/registeration";
import VerifyMobileNumber from "./src/pages/verifyMobileNumber";
import HomeDetails from "./src/pages/homeDetails";
import SearchPage from "./src/pages/search";
import CameraPage from "./src/pages/camera";
import OptionsPage from "./src/pages/options";
import SplashScreen from "./src/pages/splashScreen";

export default class App extends React.Component {

  render(){
    return (
      <Provider store={store}>
        <Router>
        <Stack key="root">
          <Scene
            hideNavBar={true}
            key="searchPage"
            component={SearchPage}
            title="SearchPage"
          />
          <Scene
            hideNavBar={true}
            key="homeDetails"
            component={HomeDetails}
            title="HomeDetails"
          />
          <Scene
            hideNavBar={true}
            key="splashScreen"
            component={SplashScreen}
            title="splashScreen"
          />
          <Scene
            hideNavBar={true}
            key="loginPage"
            component={LoginPage}
            title="LoginPage"
          />
          <Scene
            hideNavBar={true}
            key="registerationPage"
            component={RegisterationPage}
            title="RegisterationPage"
          />
          <Scene
            hideNavBar={true}
            key="optionsPage"
            component={OptionsPage}
            title="OptionsPage"
          />
          <Scene
            hideNavBar={true}
            key="cameraPage"
            component={CameraPage}
            title="CameraPage"
          />
          <Scene
            hideNavBar={true}
            key="verifyMobileNumber"
            component={VerifyMobileNumber}
            title="verifyMobileNumber"
          />
          <Scene
            hideNavBar={true}
            key="homePage"
            component={HomePage}
            title="HomePage"
          />
          </Stack>
        </Router>
      </Provider>
    );
  }
}

// https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/Ionicons.json
