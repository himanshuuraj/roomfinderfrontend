import React, {Component} from 'react';
import {
  Platform,
  Text, 
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content
} from "native-base";
import {
  getFont,
  Color,
  getHeight
} from "../global/util";
import ImageLogoComponent from "./../components/imageLogoComponent";
import EnterOTP from "./../components/enterOtp";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { verifyOTP } from "./../redux/action";

class VerifyMobileNumber extends Component {

  state = {
    phone : "",
    password : ""
  };

  constructor(props){
    super(props);
  }

  updateOTP = otp => {
    this.setState({ otp });
  };

  componentDidMount(){
    //setTimeout(() => this.props.moveToScreen("splashScreen"), 5000);
  }

  render() {
    return (
      <Container>
      <Content style={{
        backgroundColor : Color.themeColor,
        paddingHorizontal : "4%",
        width : "100%"
      }}>
        <KeyboardAvoidingView behavior={Platform.select({android: "padding", ios: 'padding'})}
         enabled>
         <ImageLogoComponent/>
         <View style={{
           height : getHeight(5)
         }}/>
         <Text style={{
           fontSize : getFont(20),
           color : Color.themeFontColor,
           marginBottom : getHeight(4)
         }}>
           VERIFY MOBILE NUMBER
         </Text>
         <Text style={{
           fontSize : getFont(16),
           color : Color.themeFontColor
         }}>
           A 6 DIGIT CODE IS SENT TO
         </Text>
         <Text style={{
           fontSize : getFont(16),
           color : Color.themeFontColor,
           marginBottom : getHeight(4)
         }}>
           {
             this.props.userInfo.phoneNumber
           }
         </Text>
         <Text style={{
           fontSize : getFont(16),
           color : Color.themeFontColor,
           marginBottom : getHeight(1)
         }}>
           ENTER 6 DIGIT CODE HERE
         </Text>
         <View style={{
           flexDirection : "row",
           justifyContent : "center",
           alignItems : "center",
           marginBottom : getHeight(4)
         }}>
            <EnterOTP updateOTP={this.updateOTP}/>
         </View>
         <View style={{
           height : getHeight(6),
           justifyContent : "center",
           alignItems : "center",
           marginBottom : getHeight(4)
         }}>
            <TouchableOpacity style={{
                backgroundColor : Color.themeFontColor,
                width : '100%',
                borderRadius : 4,
                height : '100%',
                justifyContent : "center",
                alignItems : "center"
              }}
              onPress={() => {
                this.props.verifyOTP(this.props.userInfo.phoneNumber, this.state.otp);
              }}
              >
                <Text style={{
                  fontSize : getFont(14),
                  color : Color.themeColor,
                  fontWeight : "bold",
                  textAlign : 'center'
                }}>
                {"REGISTER"}
                </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Content>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
      userInfo : state.testReducer.userInfo || {}
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    verifyOTP
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyMobileNumber);