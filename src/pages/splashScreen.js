import React, {Component} from 'react';
import {
  ImageBackground,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SplashScreen extends Component {

  componentDidMount(){
    setTimeout(async () => {
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userId;
      if(userInfo){
        userInfo = JSON.parse(userInfo);
        if(!userInfo.isMobileNumberVerified)
          Actions.verifyMobileNumber();
        else if(!userInfo.userType)
          Actions.OptionsPage();
      }
    }, 3000);
  }

  render() {
    return (
      <ImageBackground style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover',
        }}
        source={require('./../images/background_image.jpg')}>
      </ImageBackground>
    );
  }
}
