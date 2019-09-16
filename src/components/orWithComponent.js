import React, {Component} from 'react';
import { 
  View,
  Image,
  Text
} from 'react-native';
import {
  getFont,
  Color,
  getHeight,
  Font
} from "../global/util";

export default class OrWithComponent extends Component {

  state = {
    phone : "",
    password : "",
    gender : "male"
  };

  constructor(props){
    super(props);
  }

  render() {
    return (
        <View style={{
            width : "100%",
            flexDirection : "row",
            marginBottom : getHeight(2)
          }}>
            <View style={{
              width : "40%",
              justifyContent : "center"
            }}>
              <View style={{
                borderColor : Color.themeFontColor,
                borderWidth : 1
              }}/>
            </View>
              <Text style={{
                fontWeight: 'bold',
                fontSize: getFont(16),
                paddingHorizontal: 5,
                alignSelf: 'center',
                color: Color.themeFontColor
              }}>
                OR WITH
              </Text>
            <View style={{
              width : "40%",
              justifyContent : "center"
            }}>
              <View style={{
                borderColor : Color.themeFontColor,
                borderWidth : 1
              }}/>
            </View>
          </View>
             )
  }
}
