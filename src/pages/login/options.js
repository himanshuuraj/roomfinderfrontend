import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { Container,
    Content, 
    Text
} from 'native-base';
import { Color, getHeight, getFont } from "../../global/util";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { setUserType, setData } from "../../redux/action";
import { UserType } from "../../global/util";

class Options extends Component {

  async componentDidMount(){
    let userInfo = await AsyncStorage.getItem("userInfo");
    if(userInfo)
      this.props.setData({ userInfo: JSON.parse(userInfo) });
  }

  render() {

    return (
      <Container>
          <Content style={{
            backgroundColor : Color.themeColor
          }}>
            <View style={{
              height : getHeight(30),
              width : "100%",
              justifyContent : "center",
              alignItems : "center"
              }}>
              <Image source={require("./../../images/home_icon.jpg")}
                    style={{flex : 1}}
                    resizeMode = "contain"/>
            </View>
            <View style={{
              height : getHeight(10),
              width : "100%"
            }}>
              
            </View>
            <View style={{
              height : getHeight(20),
              width : "100%",
              flexDirection : "row"
            }}>
                <TouchableOpacity style={{
                  display : "flex",
                  justifyContent : "center",
                  alignItems : "center",
                  width : "50%"
                }}
                onPress={e => {
                  this.props.setUserType(UserType.OWNER)
                }}
                >
                  <Image source={require("./../../images/owner.jpg")}
                    style={{flex : 1}}
                    resizeMode = "contain"/>
                  <Text style={{
                    color : "white",
                    fontSize : getFont(20)
                  }}>
                    Owner
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  justifyContent : "center",
                  alignItems : "center",
                  width : "50%"
                }}
                onPress={e => {
                  this.props.setUserType("renter")
                }}
                >
                  <Image source={require("./../../images/renter.jpg")}
                    style={{flex : 1}}
                    resizeMode = "contain"/>
                  <Text style={{
                    color : "white",
                    fontSize : getFont(20)
                  }}>
                    Renter
                  </Text>
                </TouchableOpacity>
            </View>
            <View style={{
              height : getHeight(40),
              width : "100%"
            }}/>
          </Content>
      </Container>
    );
  }
}

  function mapStateToProps(state, props) {
    return {
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      setUserType,
      setData
    }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Options);
  
