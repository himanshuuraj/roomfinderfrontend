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
import {
    Card
} from "native-base";
let imgSrc = 'https://wildfor.life/sites/default/files/species/hero/tiger_hero.jpg';

export default class HouseCardItems extends Component {

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
        <Card style={{ width: this.props.page != 'search' ? 200 : '100%', marginRight : 8}}>
        <View style={{ height : '70%',height : this.props.page != 'search' ? getHeight(12) : getHeight(20)}}>
          <Image source={{uri : imgSrc}} resizeMode="cover" style={{
            flex:1,
            width : '100%',
            height: '100%'
          }}/>
        </View>
        <View style={{padding : 5}}>
          <View style={{flexDirection : 'row'}}>
            <View style={{width : '80%'}}>
              <Text style={{fontSize: 10, fontWeight : 'bold'}}>Bipul Belmonte Gurgaon</Text>
            </View>
            <View style={{width : '20%'}}>
              <Text style={{fontSize: 8, fontWeight : 'bold'}}> 3 BHK</Text>
              <Text style={{fontSize: 8}}>Apartment</Text>
            </View>
          </View>
          <View style={{flexDirection : 'row'}}>
            <View style={{width : '50%'}}>
              <Text style={{fontSize: 8, fontWeight : 'bold'}}>Start From</Text>
              <Text style={{fontSize: 10, fontWeight : 'bold'}}>Rs. 8000/Bed</Text>
            </View>
            <View style={{width : '50%'}}>
              <Text style={{fontSize:8}}></Text>
              <Text style={{textAlign: 'right', fontSize: 8, color:'red'}}> . Only available for boys</Text>
            </View>
          </View>
        </View>
    </Card>
    )
  }
}
