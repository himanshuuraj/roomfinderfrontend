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
import MapView from 'react-native-maps';

export default class Location extends Component {

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
             height : getHeight(60),
             width : "100%",
             justifyContent : "center",
             alignItems : "center"
           }}>
              <MapView
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            />
           </View>
    )
  }
}
