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
import { Actions } from 'react-native-router-flux';
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
      <Card style={{ width: this.props.page != 'search' ? 200 : '100%', marginRight : 8, paddingTop : 10}}>
        <TouchableOpacity onPress={() => {
          this.props.setData({ selectedApartment : item });
          Actions.homeDetails();
        }}  style={{ height : '100%', width : '100%' }}>
        <View style={{ height : '70%',height : this.props.page != 'search' ? getHeight(12) : getHeight(20)}}>
          <Image source={{uri : (item.imageList && item.imageList.length > 0 )? item.imageList[0].uri : imgSrc }} resizeMode="contain" style={{
            flex : 1
          }}/>
        </View>
        <View style={{paddingHorizontal : 16, marginVertical : 10}}>
          <View style={{flexDirection : 'row'}}>
            <View style={{width : '80%'}}>
              <Text style={{fontSize: 14, fontWeight : 'bold'}}>{ item.apartmentName }</Text>
            </View>
            <View style={{width : '20%'}}>
              <Text style={{fontSize: 14, fontWeight : 'bold', textTransform : 'uppercase'}}> 
                { item.apartmentType } 
              </Text>
            </View>
          </View>
          <View style={{flexDirection : 'row'}}>
            <View style={{width : '30%'}}>
              {/* <Text style={{fontSize: 8, fontWeight : 'bold'}}>Start From</Text>*/}
              <Text style={{fontSize: 12, fontWeight : 'bold'}}>{item.cityArea.area}</Text> 
            </View>
            <View style={{width : '70%'}}>
              <Text style={{textAlign: 'right', fontSize: 14, color:'red'}}>  &#183; { availableFor } </Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
      </Card>
    )
  }
}
