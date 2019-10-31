import React, {Component} from 'react';
import {
  Text, 
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  Container,
  Content,
  Icon,
  Header,
  Card,
  Footer
} from "native-base";
import {
  getFont,
  Color,
  getHeight,
  UserType
} from "../../global/util";
// import Location from "./../components/location";
import HouseCardItem from "../../components/houseCardItems";
import * as Permissions from 'expo-permissions';
import Carousel from "../../components/carousel";
import { Constants } from 'expo';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { setData } from "../../redux/action";
import { Actions } from 'react-native-router-flux';

let { width } = Dimensions.get('window');
const height = width * 0.8

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

const images = [
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg',
    },
  },
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/05/02/22/43/mushroom-2279558__340.jpg',
    },
  },
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/05/18/21/54/tower-bridge-2324875__340.jpg',
    },
  },
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/05/16/21/24/gorilla-2318998__340.jpg',
    },
  },
  
];

class HomeDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      isOwner : true
    }
  }

  async componentDidMount(){
    let userInfo = this.props.userInfo;
    this.props.setData({ isOwner : userInfo.userType == UserType.OWNER ? true : false});
    this.setState({ isOwner : userInfo.userType == UserType.OWNER ? true : false});
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let selectedApartment = this.props.selectedApartment;
    tableContent[0].value = selectedApartment.size || "N/A";
    tableContent[1].value = selectedApartment.houseId || "N/A";
    tableContent[2].value = selectedApartment.apartmentType || "N/A";
    tableContent[3].value = selectedApartment.foodPreference || "N/A";
    return (
      <Container>
        <Header style={{
          backgroundColor : Color.themeColor,
          alignItems : "center",
          justifyContent : "flex-start",
          paddingLeft : "5%",
          marginTop: StatusBar.currentHeight
        }}>
          <TouchableOpacity style={{
              display : "flex",
              flexDirection : "row",
              justifyContent : "center",
              alignItems : "center"
          }}>
            <Icon name="ios-arrow-back" style={{
              color : "white",
              marginRight : 20
            }}/>
            <Text style={{
              fontSize : getFont(18),
              color : Color.white
            }}>
              { selectedApartment.apartmentName }
            </Text>
          </TouchableOpacity>
        </Header>
        <Content style={{
          width : "100%",
          paddingHorizontal : 16
        }}>
            <Text style={{ marginTop : 16, fontWeight: 'bold', fontSize: 16 }}> Rooms Available </Text>
            <View style={{ flexDirection : 'row', marginTop : 5, flexWrap : 'wrap'}}>
              {
                selectedApartment.roomlist && selectedApartment.roomlist.map((item, index) => {
                    return (
                      <View key={index} 
                      style={{ 
                        paddingHorizontal : 16, 
                        paddingVertical : 8,
                        marginRight : 8, 
                        marginTop : 10,
                        borderWidth : 1,
                        borderColor : '#ccc'
                      }}>
                        <Text style={{ color : 'black' }}> {item.name} </Text>
                      </View>
                    )
                })
              }
            </View>
            {
              this.state.isOwner && (
                  <TouchableOpacity
                    style={{
                      borderWidth : 1,
                      borderColor : Color.black,
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
                    <Text style={{ fontSize : 16 }}>Add Room</Text>
                </TouchableOpacity>
              )
            }
            <View style={styles.container}>
              <Carousel images={images} />
            </View>
            {
              selectedApartment.amentiesList && selectedApartment.amentiesList.length > 0 && (
                <Card style={{ paddingHorizontal : 16, paddingVertical : 16, marginTop : 16 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}> Amenities </Text>
                  <View style={{ flexDirection : 'row', marginTop : 5, flexWrap : 'wrap'}}>
                    {
                      selectedApartment.amentiesList.map((item, index) => {
                          return (
                            <View key={index} 
                            style={{ 
                              paddingHorizontal : 16, 
                              paddingVertical : 8,
                              marginRight : 8, 
                              marginTop : 10,
                              borderWidth : 1,
                              borderColor : '#ccc'
                            }}>
                              <Text style={{ color : 'black' }}> {item.amenityName} </Text>
                            </View>
                          )
                      })
                    }
                  </View>
                </Card>
              )}

            <Card style={{
              marginTop : getHeight (2)
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
              <Text style={{ marginTop : 10, marginBottom : 5}}>Similiar Listing</Text>
              <ScrollView horizontal style={{marginBottom : getHeight(2)}}>
                {
                  this.props.apartmentList.map((item, index) => ( <HouseCardItem item={item} key={index} />))
                }
              </ScrollView>
        </Content>
        <Footer>
          <View style={{ 
            justifyContent : 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            width: '100%'
            }}>
                <Text style={{color : 'white', fontSize : 14, fontWeight: 'bold', textAlign: 'center'}}> 
                  BOOK NOW 
                </Text>
          </View>
        </Footer>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    selectedApartment : state.testReducer.selectedApartment,
    userInfo : state.testReducer.userInfo,
    apartmentList : state.testReducer.apartmentList || []
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    borderWidth : 1,
    padding : 1, 
    borderColor : 'black'
  },
  scrollContainer: {
    height,
  },
  image: {
    width,
    height,
  },
});

