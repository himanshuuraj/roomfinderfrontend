import React, {Component} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import {
  Container,
  Content
} from "native-base";
import {
  Color
} from "./../global/util";
import LoginFormComponent from './../components/loginFormComponent';
import RegisterationComponent from "./../components/registerationComponent";
import ImageLogoComponent from "./../components/imageLogoComponent";
import { sendOTP, verifyOTP, verifyEmail } from "./../redux/action";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class Login extends Component {

  state = {
    password : "",
    screenType : 'login'
  };

  constructor(props){
    super(props);
  }

  async componentDidMount(){
    // let userInfo = await AsyncStorage.getItem("userInfo");
    // if(!userInfo){
    //   userInfo = JSON.parse(userInfo);
    // }else{
    //   Actions.registerationPage();
    // }
  }

  updateData = (obj) => {
    this.setState(obj);
  }

  onSubmit = () => {
    let { phoneNumber, otp, selectPrivacyPolicy, loginType, email, password } = this.state;
    if(loginType === 'phone'){
      if(!phoneNumber){
        alert("Please enter valid phone number");
        return;
      }
      if(phoneNumber.length != 10){
        alert("Please enter valid 10 digit number");
        return;
      }
      if(!otp){
        alert("Please enter otp");
        return;
      }
      if(otp.length != 6){
        alert("Please enter valid otp");
        return;
      }
      if(!selectPrivacyPolicy){
        alert("Please select the privacy policy");
        return;
      }
      this.props.verifyOTP(phoneNumber, otp);
    }else if(loginType == 'email'){
      if(!email){
        alert("Please enter email");
        return;
      } 
      var atposition = email.indexOf("@");  
      var dotposition = email.lastIndexOf(".");  
      if (atposition < 1 || dotposition < atposition+2 || dotposition+2 >= email.length){  
        alert("Please enter a valid e-mail address");  
        return false;  
      }  
      if(!password){
        alert("Please enter password");
        return;
      }
      if(password.length < 6){
        alert("Password length should be atleast 6 digit length");
        return;
      }
      if(!selectPrivacyPolicy){
        alert("Please select the privacy policy");
        return;
      }
      this.props.verifyEmail(email, password);
    }
  }

  sendOTP = () => {
    let { phoneNumber } = this.state;
    if (!phoneNumber) {
      alert("Please enter a phone number");
      return;
    }
    if (phoneNumber.length != 10) {
      alert("Please enter a valid phone number");
      return;
    }
    this.props.sendOTP(phoneNumber);
  };

  toggleScreenType = type => {
    this.setState({
      screenType : type
    })
  }

  render() {
    return (
      <Container>
      <Content style={{
        backgroundColor : Color.themeColor,
        paddingLeft : "4%",
        width : "100%",
        paddingRight : "4%"
      }}>
        <KeyboardAvoidingView behavior={Platform.select({android: "padding", ios: 'padding'})}
         enabled>
          <ImageLogoComponent/>
          <LoginFormComponent sendOTP={this.sendOTP} onSubmit={this.onSubmit} updateData={this.updateData} screenType='login'/>
          <RegisterationComponent toggleScreenType={this.toggleScreenType} screenType='login'/>
        </KeyboardAvoidingView>
      </Content>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
      data : state.testReducer.test
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendOTP,
    verifyOTP,
    verifyEmail
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
