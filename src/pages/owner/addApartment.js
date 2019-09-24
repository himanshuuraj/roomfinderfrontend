import React, {Component} from 'react';
import {
  Platform,
  Button,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import {
  Container,
  Content,
  Card
} from "native-base";
import {
  Color, HomeType, FoodPreference
} from "../../global/util";
import { getAmenities, setData } from "../../redux/action";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Camera from "../../components/camera";
import { saveApartment } from "../../redux/action";
import Carousel from "./../../components/carousel";
let { width } = Dimensions.get('window');
const height = width * 0.8

class AddApartment extends Component {

  state = {
    amentiesList : [],
    apartmentType : "",
    address : {
      line1 : "",
      line2 : "",
      landmark : "",
      city : "",
      state : "",
      pincode : ""
    },
    imageList : [
      {uri : "https://www.theladders.com/wp-content/uploads/Lion_030818-800x450.jpg" },
      {uri : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_oqELFy0XAi5XgMwDxIPk3pViaaRtRZCvfOmFwGiZDiyAo3TE" },
      {uri : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStuKc50NByVlFpbl4q3dujR6vHpXIPxOZDYvCs5JLfVmnHm3HvQg" },
      {uri : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ5qurrqRtbIHw7vBt7oDJU13zCu1K-ML3QXYvWnUrMpMFFF72" }
    ],
    foodPreference : "",
    modalVisible: true,
    showCamera : false
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  componentDidMount(){
      if(this.props.amenitiesList.length == 0){
        //this.props.getAmenities();
      }
      this.props.setData({
        carouselData : {
          show : true,
          imageList : this.state.imageList
      }
      });
  }

  separator = () => {
    return <View style={{
        marginVertical: 8,
        width : 200,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }} />;
  }

  foodPreference = () => {
    return (
      <View style={{ ...viewObj }}>
          <Text style={{
            ...textObj
          }}>Food Preference</Text>
          <View style={{ 
            flexDirection : 'row',
            flexWrap : 'wrap',
            paddingHorizontal : 8,
            paddingVertical : 16
          }}>
          {
            Object.keys(FoodPreference).map((item, index) => (
              <TouchableOpacity key={index} 
                  onPress={ e => {
                    this.setState({
                      foodPreference: FoodPreference[item]
                    })
                  }}
                  style={{ 
                      borderRadius : 4,
                      paddingHorizontal : 8, 
                      paddingVertical : 4 ,
                      borderColor : 'black',
                      borderWidth : 1,
                      marginRight : 4,
                      marginTop : 4,
                      backgroundColor : this.state.foodPreference == FoodPreference[item] ? Color.themeColor : Color.white
                  }}>
                      <Text style={{
                        color : this.state.foodPreference == FoodPreference[item] ? Color.white : "#696969",
                      }}>{ FoodPreference[item].toUpperCase() }</Text>
              </TouchableOpacity>
            ))
          }
          </View>
      </View>
    )
  }

  apartMentType = () => {
    return (
      <View style={{ ...viewObj }}>
          <Text style={{
            ...textObj
          }}>Type</Text>
          <View style={{ 
            flexDirection : 'row',
            flexWrap : 'wrap',
            paddingHorizontal : 8,
            paddingVertical : 16
          }}>
          {
            Object.keys(HomeType).map((item, index) => (
              <TouchableOpacity key={index} 
                  onPress={ e => {
                    this.setState({
                      apartmentType: HomeType[item]
                    })
                  }}
                  style={{ 
                      borderRadius : 4,
                      paddingHorizontal : 8, 
                      paddingVertical : 4 ,
                      borderColor : 'black',
                      borderWidth : 1,
                      marginRight : 4,
                      marginTop : 4,
                      backgroundColor : this.state.apartmentType == HomeType[item] ? Color.themeColor : Color.white
                  }}>
                      <Text style={{
                        color : this.state.apartmentType == HomeType[item] ? Color.white : "#696969",
                      }}>{ HomeType[item].toUpperCase() }</Text>
              </TouchableOpacity>
            ))
          }
          </View>
      </View>
    )
  }
  
  amenitiesList = () => {
    return (
      <View style={{ ...viewObj }}>
          <Text style={{
            ...textObj
          }}>Select Amenities</Text>
          <View style={{ 
            flexDirection : 'row',
            flexWrap : 'wrap',
            justifyContent : 'space-between',
            paddingHorizontal : 8,
            paddingVertical : 16
          }}>
          {
            this.props.amenitiesList.map((item, index) => (
                <TouchableOpacity key={index} 
                    onPress={ e => {
                      let amentiesList = this.state.amentiesList;
                      let indexOfMatch;
                      if(amentiesList.find((item1, index1) => {
                        indexOfMatch = index1;
                        return item1.amentyId == item.amentyId
                      })){
                        amentiesList.splice(indexOfMatch, 1);
                      }else{
                        amentiesList.push(item);
                      }
                      this.setState({ amentiesList: amentiesList });
                    }}
                    style={{ 
                        borderRadius : 4,
                        paddingHorizontal : 8, 
                        paddingVertical : 4 ,
                        borderColor : 'black',
                        borderWidth : 1,
                        marginRight : 4,
                        marginTop : 4,
                        backgroundColor : this.state.amentiesList.find(item1 => item1.amentyId == item.amentyId) ? Color.themeColor : Color.white
                  }}>
                  <Text style={{
                    color : this.state.amentiesList.find(item1 => item1.amentyId == item.amentyId) ? Color.white : "#696969",
                  }}>{item.amenityName}</Text>
                </TouchableOpacity>
            ))
        }
        </View>
      </View>
    );
  }

  addAddress = () => {
    return (
      <View style={{ ...viewObj }}>
          <Text style={{
            ...textObj
          }}>Address</Text>
          <View style={{
            paddingHorizontal : 8,
            paddingVertical : 16
          }}>
            <Text>Line1</Text>
            <TextInput 
              multiline
              numberOfLines={2}
              underlineColorAndroid="#bbb"
              style={{
                paddingLeft : 16
              }}
              placeholder="Belmonte Heights"
              onChangeText={line1 => {
                this.setState({
                  address : { ...this.state.address, line1 }
                });
              }}
              value={this.state.address.line1}/>
            <Text>Line2</Text>
            <TextInput
              multiline
              numberOfLines={2}
              underlineColorAndroid="#bbb"
              style={{
                paddingLeft : 16
              }}
              placeholder="18th B Main Road"
              onChangeText={line2 => {
                this.setState({
                  address : { ...this.state.address, line2 }
                });
              }}
              value={this.state.address.line2}/>
            <Text>LandMark</Text>
            <TextInput
              underlineColorAndroid="#bbb"
              style={{
                paddingLeft : 16,
                paddingBottom : 4
              }}
              placeholder="near Cult.fit Gym"
              onChangeText={landmark => {
                this.setState({
                  address : { ...this.state.address, landmark }
                });
              }}
              value={this.state.address.landmark}/>
            <Text>City</Text>
            <TextInput
              underlineColorAndroid="#bbb"
              style={{
                paddingLeft : 16,
                paddingBottom : 4
              }}
              placeholder="Patna"
              onChangeText={city => {
                this.setState({
                  address : { ...this.state.address, city }
                });
              }}
              value={this.state.address.city}/>
            <Text>State</Text>
            <TextInput
              underlineColorAndroid="#bbb"
              style={{
                paddingLeft : 16,
                paddingBottom : 4
              }}
              placeholder="Bihar"
              onChangeText={state => {
                this.setState({
                  address : { ...this.state.address, state }
                });
              }}
              value={this.state.address.state}/>
            <Text>PinCode</Text>
            <TextInput
              underlineColorAndroid="#bbb"
              style={{
                paddingLeft : 16,
                paddingBottom : 4
              }}
              placeholder="560034"
              onChangeText={pincode => {
                this.setState({
                  address : { ...this.state.address, pincode }
                });
              }}
              value={this.state.address.pincode}/>
          </View>
      </View>
    );
  }

  openModal = () => {
    return (
      <View style={{
          position : 'absolute',
          justifyContent : 'center',
          alignItems : 'center',
          backgroundColor : 'green'
        }}>
          <View style={{
            width : 250,
            height : 250
          }}>

          </View>
      </View>
    );
  }

  rules = () => {}

  hideCamera = () => {
    this.setState({ showCamera : false, showCamera : false });
  }

  getAwsImageUrl = (imageUrl) => {
    let imageList = this.state.imageList;
    imageList.push({ uri : imageUrl });
    this.setState({ imageList });
  }

  addImage = () => {
    return (
      <View style={{ ...viewObj }}>
          <Text style={{
            ...textObj
          }}>Image Gallery</Text>
        <View style={{
            paddingHorizontal : 8,
            paddingVertical : 16
          }}>
          <TouchableOpacity
            style={{
              borderWidth : 1,
              borderColor : Color.black,
              borderRadius : 4,
              justifyContent : 'center',
              alignItems : 'center',
              marginVertical : 8,
              height : 36
            }}
            onPress={e => {
              this.setState({ showCamera : true });
            }}
          >
            <Text style={{ fontSize : 14 }}>ADD IMAGE FROM CAMERA</Text>
          </TouchableOpacity>
          <Camera type={'gallery'} getAwsImageUrl={this.getAwsImageUrl} /> 
        </View>
      </View>
    );
  }

  showGallery = () => {
    <View style={{

    }}>
      <View style={{ flexDirection : 'row' }}>
        <TouchableOpacity style={{
          width : '100%',
          height : '100%'
        }}>
          <Image source={{}} resizeMode='contain' style={{ flex : 1 }}/>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection : 'row' }}>
        
      </View>
    </View>
  }

  addApartment = () => {
    let { amentiesList, apartmentType, address, foodPreference } = this.state;
    if(amentiesList.length == 0){
      alert("Please select an amenity");
      return;
    }
    if(!apartmentType){
      alert("Please select an apartmentType");
      return;
    }
    if(!address.line1){
      alert("Please write address");
      return;
    }
    if(!address.pincode){
      alert("Please write pincode");
      return;
    }
    if(!foodPreference){
      alert("Please select foodpreference");
      return;
    }
    this.props.saveApartment(this.state);
  }

  render() {
      return (
        <Container>
            <Carousel />
            <Content style={{
              backgroundColor : Color.backgroundThemeColor,
              paddingLeft : "4%",
              width : "100%",
              paddingRight : "4%",
              marginTop: StatusBar.currentHeight
            }}>
                  <KeyboardAvoidingView behavior={Platform.select({android: "padding", ios: 'padding'})}
                  enabled>
                    <View style={{ position: 'relative'}}>

                        

                        {
                          this.showGallery()
                        }
                        
                        {
                          this.addImage()
                        }
                      
                        <View style={{ ...viewObj }}>
                          <Text 
                            style={{
                              ...textObj
                            }}>House Name</Text>
                          <TextInput
                            underlineColorAndroid="#bbb"
                            placeholder="e.g. Belmonte Heights"
                            style={{
                              paddingLeft : 16,
                              paddingBottom : 2,
                              height : 40
                            }}
                            onChangeText={apartmentName => {
                              this.setState({ apartmentName });
                            }}
                            value={this.state.apartmentName}/>
                        </View>

                        {
                          this.amenitiesList()
                        }
                      
                        {
                          this.apartMentType()
                        }
                        
                        {
                          this.foodPreference()
                        }

                        {
                          this.addAddress()
                        }                      

                        <TouchableOpacity
                            style={{
                              borderRadius : 4,
                              justifyContent : 'center',
                              alignItems : 'center',
                              marginVertical : 8,
                              height : 36,
                              backgroundColor : Color.themeColor
                            }}
                            onPress={e => {
                              this.addApartment();
                            }}
                          >
                            <Text style={{ fontSize : 16, color : Color.white }}>ADD</Text>
                          </TouchableOpacity>

                      </View>
                  </KeyboardAvoidingView>
              </Content>
              <Camera type="camera" showCamera={this.state.showCamera} hideCamera={this.hideCamera} getAwsImageUrl={this.getAwsImageUrl} />
        </Container>
      );
  }
}

function mapStateToProps(state, props) {
  return {
      amenitiesList : state.testReducer.amenitiesList,
      addType : state.testReducer.addType
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAmenities,
    setData,
    saveApartment
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddApartment);

let viewObj = {
  marginTop : 16, borderWidth: StyleSheet.hairlineWidth, borderRadius : 4
}

let textObj = {
  position : 'absolute',
  top : -8,
  left : 8,
  fontSize : 12,
  backgroundColor : Color.white,
  paddingHorizontal : 2,
  backgroundColor : Color.backgroundThemeColor
}