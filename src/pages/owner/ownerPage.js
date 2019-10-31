import React, {Component} from 'react';
import {
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {
  Container
} from "native-base";
import {
  Color, getHeight
} from "../../global/util";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {
  getApartments,
  setData
} from "../../redux/action";
import { Actions } from 'react-native-router-flux';
import { getApartment } from "../../redux/action";
import * as Permissions from 'expo-permissions';

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

  async componentDidMount(){
    let userInfo = await AsyncStorage.getItem("userInfo");
    if(userInfo){
      this.props.getApartments();
      this.props.setData({ userInfo: JSON.parse(userInfo) });
    }
    Permissions.askAsync(Permissions.CAMERA);
  }

  separator = () => {
    return <View style={{
        marginVertical: 8,
        width : 200,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth
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
                        fontSize: 22,
                        marginBottom : 20
                    }}>
                    Your Houses
                </Text>
                {
                    this.props.allApartments.map((item, index) =>
                        <TouchableOpacity 
                          onPress={e => {
                            this.props.getApartment(item.apartmentId);
                          }}
                          style={{
                              backgroundColor : 'white',
                              width : 200,
                              height : getHeight(5),
                              justifyContent : 'center',
                              alignItems : 'center',
                              borderRadius : 4,
                              marginBottom : 8,
                              borderWidth : StyleSheet.hairlineWidth,
                              borderColor : Color.black
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
                        borderRadius : 4,
                        justifyContent : 'center',
                        alignItems : 'center',
                        backgroundColor : Color.themeColor
                    }}
                    onPress={() => {
                        this.props.setData({ addType : "apartment" });
                        Actions.addApartment();
                    }}
                >
                    <Text style={{ fontSize : 16, color : Color.themeFontColor, textAlign: 'center' }}> 
                        ADD
                    </Text>
                </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    allApartments : state.testReducer.allApartments || []
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setData,
    getApartments,
    getApartment
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerPage);
