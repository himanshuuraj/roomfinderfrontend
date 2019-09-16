import React, {Component} from 'react';
import {
  Platform,
  Text, 
  View,
  Picker,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView
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
} from "./../global/util";
import ImageLogoComponent from '../components/imageLogoComponent';
import OrWithComponent from "./../components/orWithComponent";
import RegisterationComponent from "./../components/registerationComponent";

export default class ForgotPassword extends Component {

  state = {
    phone : "",
    password : "",
    gender : "male"
  };

  constructor(props){
    super(props);
  }

  componentDidMount(){
    setTimeout(() => this.props.moveToScreen("verifyMobileNumber"), 5000);
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
            <View style={{
           height : getHeight(10),
           width : "100%",
           justifyContent : "center",
           alignItems : "flex-start"
         }}>
            <Text style={{
              fontSize : getFont(22),
              fontFamily : Font.themeFont,
              color : "white"
            }}>
              {"FORGOT PASSWORD"}
            </Text>
         </View>
            <View style={{
           height : getHeight(10),
           marginBottom : getHeight(4)
         }}>
            <View style={{
                height : "40%"
            }}>
              <Text style={{
                color : "white",
                fontSize : getFont(14),
                marginBottom : 5
              }}>
                EMAIL
              </Text>
            </View>
            <View style={{
                height : "60%",
                borderWidth : 1,
                borderRadius : 5,
                borderColor : "white",
                paddingLeft : 10,
                flexDirection : "row",
                alignItems : "center"
              }}>
              <Icon name="ios-mail" 
                 style={{
                   fontSize: getFont(30), 
                   color: 'white',
                   marginRight : 10
                 }}/>
              <TextInput placeholder="Enter Email"
              placeholderTextColor = { Color.themeFontColor }
              style={{
                color : Color.themeFontColor
              }}/>
           </View>
         </View>
            <OrWithComponent/>
            <View style={{
           height : getHeight(10),
           marginBottom : getHeight(4)
         }}>
            <View style={{
                height : "40%"
            }}>
              <Text style={{
                color : "white",
                fontSize : getFont(14),
                marginBottom : 5
              }}>
                Mobile Number
              </Text>
            </View>
            <View style={{
                height : "60%",
                borderWidth : 1,
                borderRadius : 5,
                borderColor : "white",
                paddingLeft : 10,
                flexDirection : "row",
                alignItems : "center"
              }}>
              <Icon name="ios-phone-portrait" 
                 style={{
                   fontSize: getFont(30), 
                   color: 'white',
                   marginRight : 10
                 }}/>
              <TextInput placeholder="Enter Number"
              placeholderTextColor = { Color.themeFontColor }
              style={{
                color : Color.themeFontColor
              }}/>
           </View>
         </View>
         <RegisterationComponent screenType="forgotPassword"/>
          </KeyboardAvoidingView>
        </Content>
        </Container>
             )
  }
}
