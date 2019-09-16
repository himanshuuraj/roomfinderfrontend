import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
import { Container, Header, Title, 
    Content, 
    Footer,
    FooterTab, Button, 
    Left, Right, 
    Body, Icon, 
    Text, 
    Grid,
    Row,
    Col,
    Card
} from 'native-base';
import { Color, getHeight, getFont, getWidth } from "./../global/util";

export default class Options extends Component {

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
              <Image source={require("./../images/home_icon.jpg")}
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
                }}>
                  <Image source={require("./../images/owner.jpg")}
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
                }}>
                  <Image source={require("./../images/renter.jpg")}
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
  
