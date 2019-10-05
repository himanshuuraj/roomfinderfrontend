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
} from "../../global/util";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import LoginFormComponent from '../../components/loginFormComponent';
import RegisterationComponent from "../../components/registerationComponent";
import ImageLogoComponent from "../../components/imageLogoComponent";
import {
  registerUser,
  setData
} from "../../redux/action";

class Registeration extends Component {

  state = {
    gender : 'male'
  };

  constructor(props){
    super(props);
  }

  // async componentDidMount(){
  //   let userInfo = await AsyncStorage.getItem("userInfo");
  //   this.props.setData({ userInfo: userInfo });
  // }

  updateData = (obj) => {
    this.setState(obj);
  }

  onSubmit = () => {
    let { firstName, lastName, gender, email, password, selectPrivacyPolicy, phoneNumber } = this.state;
    if(!firstName){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Please enter first name"
        }
      });
      return;
    }
    if(!lastName){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Please enter last name"
        }
      });
      return;
    }
    if(!gender){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Please enter gender"
        }
      });
      return;
    }
    if(!phoneNumber){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Please enter the phonenumber"
        }
      });
      return;
    }
    if(phoneNumber.length != 10){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Please enter 10 digit phone number"
        }
      });
      return;
    }
    if(!email){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Please enter email"
        }
      });
      return;
    } 
    var atposition = email.indexOf("@");  
    var dotposition = email.lastIndexOf(".");  
    if (atposition < 1 || dotposition < atposition+2 || dotposition+2 >= email.length){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Please enter a valid e-mail address"
        }
      });
      return false;  
    }  
    if(!password){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Please enter password"
        }
      });
      return;
    }
    if(password.length < 6){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Password length should be atleast 6 digit length"
        }
      });
      return;
    }
    if(!selectPrivacyPolicy){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Please select the privacy policy"
        }
      });
      return;
    }
    this.props.registerUser(this.state);
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
          <LoginFormComponent onSubmit={this.onSubmit} updateData={this.updateData} screenType="registeration"/>
          <RegisterationComponent screenType="registeration"/>
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
    registerUser,
    setData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Registeration);