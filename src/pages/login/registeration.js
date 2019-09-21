import React, {Component} from 'react';
import {
  Platform,
  KeyboardAvoidingView
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
  registerUser
} from "../../redux/action";

class Registeration extends Component {

  state = {
    gender : 'male'
  };

  constructor(props){
    super(props);
  }

  componentDidMount(){
    //setTimeout(() => this.props.moveToScreen("forgotPassword"), 5000);
  }

  updateData = (obj) => {
    this.setState(obj);
  }

  onSubmit = () => {
    let { firstName, lastName, gender, email, password, selectPrivacyPolicy, phoneNumber } = this.state;
    if(!firstName){
      alert("Please enter first name");
      return;
    }
    if(!lastName){
      alert("Please enter last name");
      return;
    }
    if(!gender){
      alert("Please enter gender");
      return;
    }
    if(!phoneNumber){
      alert("Please enter the phonenumber");
      return;
    }
    if(phoneNumber.length != 10){
      alert("Please enter 10 digit phone number");
      return;
    }
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
    registerUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Registeration);