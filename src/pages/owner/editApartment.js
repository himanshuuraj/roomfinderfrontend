import React, {Component} from 'react';
import {
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableHighlight
} from 'react-native';
import {
  Container,
  Content,
  Footer
} from "native-base";
import {
  Color, HomeType, FoodPreference
} from "../../global/util";
import { getAmenities, setData, getAreas, updateApartment } from "../../redux/action";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Camera from "../../components/camera";
import { saveApartment } from "../../redux/action";
import Carousel from "../../components/carousel";
import Loading from "../../components/loading";
import PickArea from "../../components/pickArea";
import Header from "./../../components/header";
import { Actions } from 'react-native-router-flux';
import { cloneDeep } from 'lodash';
let { width } = Dimensions.get('window');

class EditApartment extends Component {

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
    imageList : [],
    foodPreference : "",
    showCamera : false,
    selectedArea : "",
    showPickArea : false
  }

  async componentDidMount(){
      if(this.props.amenitiesList.length == 0){
        this.props.getAmenities();
      }
      if(this.props.areaList.length == 0){
        this.props.getAreas();
      }
      let nextProps = cloneDeep(this.props);
      this.setState({
        ...nextProps.selectedApartment,
        selectedArea : nextProps.selectedApartment.cityArea
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
                      let indexOfMatch = amentiesList.findIndex(item1 => item1.amentyId == item.amentyId);
                      if(indexOfMatch != -1){
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
      <View style={{ ...viewObj, marginBottom : 16 }}>
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
              keyboardType='numeric'
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

  rules = () => {}

  hideCamera = () => {
    this.setState({ showCamera : false });
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
          }}>Pick Gallery</Text>
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
    return (<View style={{
      marginTop : 16,
      borderWidth : StyleSheet.hairlineWidth,
      borderColor : Color.black,
      borderRadius : 4
    }}>
      <Text 
        style={{
          ...textObj
        }}>Image Gallery</Text>
      <View style={{ justifyContent  : 'center', alignItems : 'center', paddingVertical : 8}}>
        <Text style={{ }}>
          Tab to see the bigger image
        </Text>
      </View>
      <View style={{ flexDirection : 'row', marginVertical : 16 }}>
          <ScrollView horizontal pagingEnabled>
            {this.state.imageList.map((image, index) => {
              return (
                <TouchableOpacity 
                  onPress={() => {
                    let imageList = this.state.imageList;
                    let image = imageList.splice(index, 1);
                    imageList.unshift(...image);
                    this.props.setData({
                      carouselData : {
                        show : true,
                        imageList
                      }
                    });
                    this.setState({ imageList });
                  }}
                  key={index} style={{ width : width - 36, height : 250, paddingHorizontal : 16 }}>
                  <Image resizeMode="contain" source={image} style={{ flex : 1 }} />
                  <View style={{
                    marginVertical : 8,
                    width : '100%',
                    justifyContent : 'center',
                    alignItems : 'center'
                  }}>
                    <TouchableHighlight 
                      style={{
                          paddingHorizontal : 16,
                          paddingVertical : 8,
                          backgroundColor : Color.themeColor,
                          borderRadius : 4
                      }}
                      onPress={e => {
                        let imageList = this.state.imageList;
                        imageList.splice(index, 1);
                        this.setState({ imageList });
                      }}>
                      <Text style={{
                        color : Color.white,
                        fontSize : 16
                      }}>
                        Delete this image
                      </Text>
                    </TouchableHighlight>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
      </View>
    </View>);
  }

  editApartment = () => {
    let { amentiesList, apartmentType, address, foodPreference, selectedArea } = this.state;
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
    if(!selectedArea){
      alert("Please select an area");
      return;
    }
    this.props.updateApartment({...this.state, cityArea : selectedArea});
  }

  hideShowPickArea = () => {
    this.setState({
      showPickArea : false
    });
  }

  selectedArea = (selectedArea) => {
    this.setState({ selectedArea : selectedArea });
  }

  onBackPress = () => {
    Actions.pop();
    //Actions.appartmentDetails();
  }

  render() {
      return (
        <Container>
            <Carousel />
            <Loading />
            <Header headerText={ 'EDIT APARTMENT' } onBackPress={this.onBackPress}/>
            <Content style={{
              backgroundColor : Color.backgroundThemeColor,
              paddingLeft : "4%",
              width : "100%",
              paddingRight : "4%"
            }}>
                  <KeyboardAvoidingView behavior={Platform.select({android: "padding", ios: 'padding'})}
                  enabled>
                    <View style={{ position: 'relative'}}>
                        {
                          this.state.imageList.length > 0 && this.showGallery()
                        }
                        
                        {
                          this.addImage()
                        }

                        <PickArea 
                          show={this.state.showPickArea} 
                          areaList={this.props.areaList} 
                          hideShowPickArea = {this.hideShowPickArea}
                          selectedArea = {this.selectedArea}
                        />
                      
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
                              height : 40,
                              marginTop : 4
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

                        <View style={{ ...viewObj, paddingHorizontal : 8, paddingVertical : 16 }}>
                          <Text style={{
                            ...textObj
                          }}>Select Area</Text>
                          <TouchableHighlight 
                          style={{ 
                            height : 36, 
                            backgroundColor : Color.white, 
                            borderRadius : 4, 
                            paddingLeft : 8,
                            justifyContent : 'center' 
                          }}
                          onPress={e => {
                              this.setState({
                                showPickArea : true
                              })
                           }}>
                            <Text style={{
                              color : this.state.selectedArea ? Color.black : "#bbb"
                            }}> 
                              { this.state.selectedArea ? this.state.selectedArea.area : "Select Area"} 
                            </Text>
                          </TouchableHighlight>
                        </View>

                        {
                          this.addAddress()
                        }                 

                      </View>
                  </KeyboardAvoidingView>
              </Content>
              {
                !this.state.showCamera && (
                  <Footer
                    style={{ backgroundColor: Color.themeColor }}>
                    <TouchableOpacity
                      style={{
                        alignItems : 'center',
                        justifyContent : 'center',
                        width : '100%'
                      }}
                      onPress={e => {
                        this.editApartment();
                      }}
                    >
                      <Text style={{ fontSize : 14, color : Color.themeFontColor }}>UPDATE</Text>
                    </TouchableOpacity>
                  </Footer>
                )
              }
              <Camera type="camera" showCamera={this.state.showCamera} hideCamera={this.hideCamera} getAwsImageUrl={this.getAwsImageUrl} />
        </Container>
      );
  }
}

function mapStateToProps(state, props) {
  return {
      amenitiesList : state.testReducer.amenitiesList,
      areaList : state.testReducer.areaList || [],
      selectedApartment : state.testReducer.selectedApartment || {}
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAmenities,
    setData,
    saveApartment,
    getAreas,
    updateApartment
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditApartment);

let viewObj = {
  marginTop : 16, 
  borderWidth: StyleSheet.hairlineWidth, 
  borderRadius : 4
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