import React, {Component} from 'react';
import {
  Platform,
  Button,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';
import {
  Container,
  Content
} from "native-base";
import {
  Color, getHeight
} from "./../global/util";
import { sendOTP, verifyOTP, verifyEmail } from "./../redux/action";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class OwnerPage extends Component {

  constructor(props){
    super(props);
    this.state = {
        apartmentList : [{
            apartmentId : 1,
            apartmentName : "Apartment Name"
        }]
    }
  }

  separator = () => {
    return <View style={{
        marginVertical: 8,
        width : 200,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }} />;
  }

  render() {
    return (
      <Container>
        <View style={{
            paddingLeft : "4%",
            paddingRight : "4%",
            marginTop: StatusBar.currentHeight,
            backgroundColor : "#eee",
            flex : 1,
            justifyContent : 'center',
            alignItems : 'center'
        }}>
                <Text style={{
                        fontSize: 24,
                        marginBottom : 20
                    }}>
                    Your Houses
                </Text>
                {
                    this.state.apartmentList.map((item, index) =>
                        <TouchableOpacity style={{
                            backgroundColor : 'white',
                            width : 200,
                            height : getHeight(5),
                            justifyContent : 'center',
                            alignItems : 'center',
                            borderRadius : 8,
                            marginBottom : 8
                        }} key ={index}>
                            <Text style={{ fontSize : 16 }}> 
                                { item.apartmentName }
                            </Text>
                        </TouchableOpacity>
                    )
                }
                {
                    this.separator()
                }
                <TouchableOpacity
                    style={{
                        width : 200,
                        height : getHeight(5),
                        borderRadius : 8,
                        justifyContent : 'center',
                        alignItems : 'center',
                        backgroundColor : Color.themeColor
                    }}
                    onPress={() => {
                        
                    }}
                >
                    <Text style={{ fontSize : 16, color : Color.themeFontColor, textAlign: 'center' }}> 
                        Add 
                    </Text>
                </TouchableOpacity>
        </View>
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
