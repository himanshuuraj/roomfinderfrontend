import React from 'react';
import { View, Text, AsyncStorage } from "react-native"; 
import { Scene, Router, Stack } from "react-native-router-flux";

import { Provider } from "react-redux";
import store from "./store";
import LoginPage from "./src/pages/login/login";
import RegisterationPage from "./src/pages/login/registeration";
import VerifyMobileNumber from "./src/pages/login/verifyMobileNumber";
import HomeDetails from "./src/pages/rental/homeDetails";
import SearchPage from "./src/pages/rental/search";
import OptionsPage from "./src/pages/login/options";
import SplashScreen from "./src/pages/login/splashScreen";
import OwnerPage from "./src/pages/owner/ownerPage";
import AddApartment from "./src/pages/owner/addApartment";
import AddRoom from "./src/pages/owner/addRoom";
import AppartmentDetails from "./src/pages/owner/apartmentDetails";
import RoomDetails from "./src/pages/owner/roomDetails";
import ErrorModal from "./src/components/ErrorModal";
import EditApartment from "./src/pages/owner/editApartment";
import EditRoom from "./src/pages/owner/editRoom";

import { UserType } from "./src/global/util";

export default class App extends React.Component {

  state = {
    screenType : ''
  }

  refreshOnBack = () => { 
    // Actions.pop(); Actions.refresh({key: Math.random()}); 
  }

  async componentDidMount(){
      let screenType = 'loginPage';
      let userInfo = await AsyncStorage.getItem("userInfo");
      if(userInfo){
        userInfo = JSON.parse(userInfo);
        // this.props.setData({ userInfo: userInfo });
        if(!userInfo.mobileNumberVerified){
          screenType = 'verifyMobileNumber';
        }
        else if(!userInfo.userType){
          screenType = 'optionsPage';
        }
        else if(userInfo.userType == UserType.OWNER){
          screenType = 'ownerPage';
        }
        else{
          screenType = 'homeDetails';
        }
      }
      this.setState({ screenType });
  }

  render(){
    return (
      <Provider store={store}>
        <ErrorModal />
        <Router>
          <Stack key="root"> 
          {/* <Scene
            hideNavBar
            key="splashScreen"
            component={SplashScreen}
            title="splashScreen"
          /> */}
          <Scene
            type="reset"
            hideNavBar={true}
            key="ownerPage"
            component={OwnerPage}
            title="OwnerPage"
            initial={this.state.screenType == 'ownerPage'}
          />
          <Scene
            hideNavBar={true}
            key="registerationPage"
            component={RegisterationPage}
            title="RegisterationPage"
            initial={this.state.screenType == 'registerationPage'}
          />
          <Scene
            hideNavBar={true}
            key="optionsPage"
            component={OptionsPage}
            title="OptionsPage"
            initial={this.state.screenType == 'optionsPage'}
          />
          <Scene
            hideNavBar={true}
            key="verifyMobileNumber"
            component={VerifyMobileNumber}
            title="verifyMobileNumber"
            initial={this.state.screenType == 'verifyMobileNumber'}
          />
          <Scene
            hideNavBar={true}
            key="editRoom"
            component={EditRoom}
            title="editroom"
          />
          <Scene
            hideNavBar={true}
            key="editApartment"
            component={EditApartment}
            title="editApartment"
            // onBack={this.refreshOnBack}
          />
           <Scene
            hideNavBar={true}
            key="roomDetails"
            component={RoomDetails}
            title="RoomDetails"
          />
          <Scene
            hideNavBar={true}
            key="appartmentDetails"
            component={AppartmentDetails}
            title="AppartmentDetails"
          />
          <Scene
            hideNavBar={true}
            key="addRoom"
            component={AddRoom}
            title="addRoom"
          />
          <Scene
            hideNavBar={true}
            key="addApartment"
            component={AddApartment}
            title="AddApartment"
          />
          <Scene
            hideNavBar={true}
            key="loginPage"
            component={LoginPage}
            title="LoginPage"
            initial={this.state.screenType == 'loginPage'}
          />
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
          </Stack>
        </Router>
      </Provider>
    );
  }
}