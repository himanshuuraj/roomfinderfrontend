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
import { sendOTP, verifyOTP, verifyEmail } from "./../redux/action";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class OwnerPage extends Component {

  constructor(props){
    super(props);
  }

  async componentDidMount(){}

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

export default connect(mapStateToProps, mapDispatchToProps)(OwnerPage);
