import React, {Component} from 'react';
import {
  Text, 
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import {
  Container,
  Content,
  Icon,
  Card,
  Footer,
  FooterTab,
  Button
} from "native-base";
import {
  getFont,
  Color,
  getHeight,
  UserType
} from "../../global/util";
// import Location from "./../components/location";
import Carousel from "../../components/carousel";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { setData } from "../../redux/action";
import { Actions } from 'react-native-router-flux';
import { deleteApartment } from "./../../redux/action";
import Header from "./../../components/header";
let { width } = Dimensions.get('window');


let tableContent = [
  {
    id : "size",
    name : "Size",
    value : "1000 sq ft."
  },
  {
    id : "houseId",
    name : "House ID",
    value : "FGVB5825"
  },
  {
    id : "type",
    name : "Type",
    value : "Appartment"
  },
  {
    id : "foodpreference",
    name : "Food Preference",
    value : "None"
  },
  {
    id : "address",
    name : "House Address",
    value : "view"
  },
  {
    id : "rules",
    name : "Rules",
    value : "view"
  },
];

class ApartmentDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      isOwner : true
    }
  }

  componentDidMount(){
    console.log(this.props, Actions.currentScene, "Actions");
  }

  showGallery = () => {
    return (<View style={{
      marginTop : 16,
      borderWidth : StyleSheet.hairlineWidth,
      borderColor : Color.black,
      borderRadius : 4,
      paddingBottom : 16,
      paddingTop : 8
    }}>
      <Text 
        style={{
          ...textObj
        }}>Image Gallery</Text>
      <View style={{ justifyContent  : 'center', alignItems : 'center', paddingTop : 10}}>
        <Text style={{ }}>
          Tab to see the bigger image
        </Text>
      </View>
      {
        this.props.imageList && this.props.imageList.length > 0 &&
        (
        <View style={{ flexDirection : 'row' }}>
            <ScrollView horizontal pagingEnabled>
              {this.props.imageList.map((image, index) => {
                return (
                  <TouchableOpacity 
                    onPress={() => {
                      // let imageList = this.state.imageList;
                      // let image = imageList.splice(index, 1);
                      // imageList.unshift(...image);
                      this.props.setData({
                        carouselData : {
                          show : true,
                          imageList : this.props.imageList
                        }
                      });
                    }}
                    key={index} style={{ width : width - 36, height : 250, paddingHorizontal : 16 }}>
                    <Image resizeMode="contain" source={image} style={{ flex : 1 }} />
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
        </View>
        )
      }
    </View>);
  }

  onBackPress = () => {
    Actions.ownerPage();
  }

  separator = () => {
    return <View style={{
        height : '60%',
        borderLeftColor: Color.white,
        borderLeftWidth: 1,
    }} />;
  }

  render() {
    let selectedApartment = this.props.selectedApartment;
    if(!selectedApartment) return null;
    tableContent[0].value = selectedApartment.size || "N/A";
    tableContent[1].value = selectedApartment.houseId || "N/A";
    tableContent[2].value = selectedApartment.apartmentType || "N/A";
    tableContent[3].value = selectedApartment.foodPreference || "N/A";
    return (
      <Container>
        <Carousel />
        <Header headerText={ selectedApartment.apartmentName.toUpperCase() } onBackPress={this.onBackPress}/>
        <Content style={{
          width : "100%", 
          paddingHorizontal : 16,
          backgroundColor : Color.backgroundThemeColor
        }}>
            <View style={{ ...viewObj, 
                    paddingTop : 5, 
                    marginBottom : 8,
                    justifyContent : 'center',
                    alignItems : 'center' }}>
                  <Text style={{
                    ...textObj
                  }}>Your Rooms</Text>
                  {
                     (selectedApartment.roomlist && selectedApartment.roomlist.length > 0) ? (
                      <View style={{ flexDirection : 'row', marginTop : 5, flexWrap : 'wrap'}}>
                        {
                          selectedApartment.roomlist.map((item, index) => {
                              return (
                                <TouchableOpacity key={index} 
                                  onPress={e => {
                                    this.props.setData({ selectedRoom : item });
                                    Actions.roomDetails();
                                  }}
                                  style={{ 
                                    paddingHorizontal : 16, 
                                    paddingVertical : 8,
                                    marginRight : 8, 
                                    marginTop : 10,
                                    borderWidth : StyleSheet.hairlineWidth,
                                    borderColor : Color.black,
                                    borderRadius : 4
                                  }}>
                                  <Text style={{ color : 'black' }}> {item.roomName} </Text>
                                </TouchableOpacity>
                              )
                          })
                        }
                      </View>
                     ) : (
                       <Text style={{ marginTop : 8, marginBottom : 4, fontSize : 16 }}>No rooms added</Text>
                     )
                  }
              </View>
            {
                  <TouchableOpacity
                    style={{
                      borderWidth : 1,
                      borderColor : Color.themeColor,
                      borderRadius : 4,
                      justifyContent : 'center',
                      alignItems : 'center',
                      marginVertical : 8,
                      height : 48
                    }}
                    onPress={e => {
                      this.props.setData({ addType : "room" });
                      Actions.addRoom();
                    }}
                  >
                    <Text style={{ fontSize : 16, color : Color.themeColor }}>
                      ADD ROOM
                    </Text>
                </TouchableOpacity>
            }
            
            {
              this.props.imageList && this.props.imageList.length > 0 && this.showGallery()
            }

            {
              selectedApartment.amentiesList && selectedApartment.amentiesList.length > 0 && (
                <View style={{ ...viewObj, paddingTop : 5 }}>
                  <Text style={{
                    ...textObj
                  }}>Amenities</Text>
                  <View style={{ flexDirection : 'row', flexWrap : 'wrap'}}>
                    {
                      selectedApartment.amentiesList.map((item, index) => {
                          return (
                            <View key={index} 
                            style={{ 
                              paddingHorizontal : 16, 
                              paddingVertical : 8,
                              marginRight : 8, 
                              marginTop : 10,
                              borderWidth : StyleSheet.hairlineWidth,
                              borderRadius : 4
                            }}>
                              <Text style={{ color : 'black' }}> {item.amenityName} </Text>
                            </View>
                          )
                      })
                    }
                  </View>
                </View>
              )}

            <Card style={{
              marginTop : getHeight(2),
              marginBottom : getHeight(1)
            }}>
                <View style={{
                  width: '100%',
                  paddingLeft : "5%",
                  height : getHeight(5),
                  justifyContent : "center",
                }}>
                  <Text style={{
                    fontWeight : "bold",
                    fontSize : 16,
                    color : Color.black
                  }}>
                    Details
                  </Text>
                </View>
                {
                  tableContent.map((item, index) => (
                    <View style={{}}
                    key={index}>
                      <View style={{
                        height : getHeight(5),
                        alignItems : "center",
                        justifyContent : "space-between",
                        flexDirection : "row",
                        backgroundColor : item.id == 'rules' || index%2 === 0 ? "#eee" : Color.white,
                        paddingHorizontal : "5%"
                      }}>
                      <Text style={{
                        fontSize : getFont(12),
                        color : Color.black
                      }}>
                        { item.name }
                      </Text>
                      {
                        item.id !== "rules" ? <Text style={{
                          fontSize : getFont(12),
                          color : Color.black
                        }}>
                          { item.id != 'address' && item.value }
                        </Text> : <TouchableOpacity 
                          style={{
                            backgroundColor : Color.green,
                            paddingHorizontal : 10,
                            borderRadius : 5
                          }}>
                          <Text style={{
                            color : Color.themeFontColor
                          }}>
                            View
                          </Text>
                        </TouchableOpacity>
                      }
                      </View>
                      {
                        item.id === 'address' && selectedApartment.address && (
                          <View style={{ padding : '5%' }}>
                              <Text style={{color : '#4a4a4a'}}> { selectedApartment.address.line1 } </Text>
                              <Text style={{color : '#4a4a4a'}}> { selectedApartment.address.line2 } </Text>
                              <Text style={{color : '#4a4a4a'}}> { selectedApartment.address.landmark } </Text>
                              <Text style={{color : '#4a4a4a'}}> { selectedApartment.address.city } </Text>
                              <Text style={{color : '#4a4a4a'}}> { selectedApartment.address.state } </Text>
                              <Text style={{color : '#4a4a4a'}}> { selectedApartment.address.pincode } </Text>
                          </View>)
                      }
                    </View>
                  ))
                }
            </Card>
            {/* <View style={{
              height : getHeight(5),
              marginTop : getHeight(4)
            }}>
              <Text style={{
                fontWeight : "bold",
                fontSize : getFont(12),
                color : Color.black
              }}>
                Location
              </Text>
              <Card style={{
                borderRadius : 10,
                backgroundColor : Color.red
              }}>
                <Location/>
              </Card>
            </View> */}
              {/* <Text style={{ marginTop : 10, marginBottom : 5}}>Similiar Listing</Text>
              <ScrollView horizontal style={{marginBottom : getHeight(2)}}>
                {
                  [...Array(10)].map((item, index) => ( <HouseCardItem key={index} />))
                }
              </ScrollView> */}
        </Content>
        <Footer>
          <FooterTab style={{
            backgroundColor : Color.themeColor,
            alignItems : 'center'
          }}>
            <Button 
              onPress={e => {
                Actions.editApartment();
                this.props.setData({ userInfo : {...this.props.userInfo} });
              }}
              style={{ backgroundColor : Color.themeColor }}>
              <Text style={{ color : Color.white }}>EDIT</Text>
            </Button>
            {
              this.separator()
            }
            <Button 
              onPress={e => {
                this.props.setData({
                  confirmModalInfo : {
                    showModal : true,
                    title : "Please Confirm",
                    primaryAction : this.props.deleteApartment
                  }
                });
              }}
              style={{ backgroundColor : Color.themeColor }}>
              <Text style={{ color : Color.white }}>DELETE</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    selectedApartment : state.testReducer.selectedApartment,
    userInfo : state.testReducer.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setData,
    deleteApartment
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentDetails);

let textObj = {
  position : 'absolute',
  top : -8,
  left : 8,
  fontSize : 12,
  backgroundColor : Color.white,
  paddingHorizontal : 2,
  backgroundColor : Color.backgroundThemeColor
}

let viewObj = {
  marginTop : 16, 
  borderWidth: StyleSheet.hairlineWidth, 
  borderRadius : 4, 
  padding : 16
}