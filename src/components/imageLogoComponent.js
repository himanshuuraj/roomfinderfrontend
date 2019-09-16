import React, {Component} from 'react';
import { 
  View,
  Image
} from 'react-native';
import {
  getFont,
  Color,
  getHeight,
  Font
} from "../global/util";

export default class ImageLogoComponent extends Component {

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
             height : getHeight(16),
             width : "100%",
             justifyContent : "center",
             alignItems : "center",
             marginTop : getHeight(8),
             marginBottom : getHeight(2)
           }}>
              <Image source={require("./../images/home_icon.jpg")}
                      style={{flex : 1}}
                      resizeMode = "contain"/>
           </View>
             )
  }
}
