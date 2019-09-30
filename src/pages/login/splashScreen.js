import React, {Component} from 'react';
import {
  ImageBackground,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { setData } from "../../redux/action";
import { UserType } from '../../global/util';
class SplashScreen extends Component {

  componentDidMount(){
    setTimeout(async () => {
      let userInfo = await AsyncStorage.getItem("userInfo");
      if(userInfo){
        userInfo = JSON.parse(userInfo);
        this.props.setData({ userInfo: userInfo });
        if(!userInfo.mobileNumberVerified)
          Actions.verifyMobileNumber();
        else if(!userInfo.userType)
          Actions.optionsPage();
        else if(userInfo.userType == UserType.OWNER)
          Actions.ownerPage();
        else
          Actions.homeDetails();
      }else{
        Actions.loginPage();
      }
    }, 0);
  }

  render() {
    return (
      <ImageBackground style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover',
        }}
        source={require('./../../images/background_image.jpg')}>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state, props) {
  return { }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
