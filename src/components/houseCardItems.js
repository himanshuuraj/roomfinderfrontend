import React, {Component} from 'react';
import { 
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  getFont,
  Color,
  getHeight,
  AvailableFor
} from "../global/util";
import {
    Card
} from "native-base";
import { Item } from 'react-native/Libraries/Components/Picker/Picker';
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
    let availableFor;
    let { item } = this.props;
    if(item.availableFor == AvailableFor.BOYS)
      availableFor = "BOYS ONLY";
    else if(item.availableFor == AvailableFor.GIRLS)
      availableFor = "GIRLS ONLY";
    else
      availableFor = "BOTH BOYS AND GIRLS";
    return (
      <Card style={{ width: this.props.page != 'search' ? 200 : '100%', marginRight : 8}}>
        <View style={{ height : '70%',height : this.props.page != 'search' ? getHeight(12) : getHeight(20)}}>
          <Image source={{uri : item.imageList ? item.imageList[0].uri : imgSrc }} resizeMode="contain" style={{
            flex : 1
          }}/>
        </View>
        <View style={{padding : 5}}>
          <View style={{flexDirection : 'row'}}>
            <View style={{width : '80%'}}>
              <Text style={{fontSize: 10, fontWeight : 'bold'}}>{ item.apartmentName }</Text>
            </View>
            <View style={{width : '20%'}}>
              <Text style={{fontSize: 8, fontWeight : 'bold'}}> { item.apartmentType } </Text>
            </View>
          </View>
          <View style={{flexDirection : 'row'}}>
            <View style={{width : '50%'}}>
              <Text style={{fontSize: 8, fontWeight : 'bold'}}>Start From</Text>
              <Text style={{fontSize: 10, fontWeight : 'bold'}}>Rs. 8000/Bed</Text>
            </View>
            <View style={{width : '50%'}}>
              <Text style={{fontSize:8}}></Text>
              <Text style={{textAlign: 'right', fontSize: 8, color:'red'}}>  &#183; { availableFor } </Text>
            </View>
          </View>
        </View>
      </Card>
    )
  }
}
