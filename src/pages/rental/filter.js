import React, {Component} from 'react';
import {
  Platform,
  Text, 
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import {
  Container,
  Content,
  Badge,
  CheckBox,
  Button,
  Icon
} from "native-base";
import {
  getFont,
  Color,
  getHeight,
  Font
} from "../../global/util";
import LoginFormComponent from '../../components/loginFormComponent';
import RegisterationComponent from "../../components/registerationComponent";
import ImageLogoComponent from "../../components/imageLogoComponent";

export default class Login extends Component {

  state = {
    phone : "",
    password : ""
  };

  constructor(props){
    super(props);
  }

  componentDidMount(){
    //setTimeout(() => this.props.moveToScreen("registeration"), 5000);
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
          <LoginFormComponent screenType="login"/>
          <RegisterationComponent screenType="login"/>
        </KeyboardAvoidingView>
      </Content>
      </Container>
    );
  }
}
