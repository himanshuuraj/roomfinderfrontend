import React, {Component} from 'react';
import {
  Platform,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import {
  Container,
  Content,
  Card,
  Footer
} from "native-base";
import {
  Color, HomeType, FoodPreference
} from "../../global/util";
import { getAmenities, setData } from "../../redux/action";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Camera from "../../components/camera";
import { saveRoom } from "../../redux/action";
import Carousel from "./../../components/carousel";
import Loading from "./../../components/loading";
import Header from "./../../components/header";
let { width } = Dimensions.get('window');
const height = width * 0.8
class AddRoom extends Component {

  state = {
    amentiesList : [],
    imageList : [],
    modalVisible: true,
    showCamera : false
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  constructor(props){
    super(props);
  }

  componentDidMount(){
      if(this.props.amenitiesList.length == 0){
        this.props.getAmenities();
      }
  }

  separator = () => {
    return <View style={{
        marginVertical: 8,
        width : 200,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }} />;
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

  getImageUrl = () => {}

  rules = () => {}

  hideCamera = () => {
    this.setState({ showCamera : false, showCamera : false });
  }

  getAwsImageUrl = (imageUrl) => {
    let imageList = this.state.imageList;
    imageList.push({ uri : imageUrl });
    this.setState({ imageList });
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
      <View style={{ justifyContent  : 'center', alignItems : 'center', paddingTop : 10}}>
        <Text style={{ }}>
          Tab to see the bigger image
        </Text>
      </View>
      <View style={{ flexDirection : 'row' }}>
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
                </TouchableOpacity>
              )
            })}
          </ScrollView>
      </View>
    </View>);
  }

  addRoom = () => {
    let { amentiesList, roomName, roomRent } = this.state;
    if(!roomName){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Please enter a room name"
        }
      });
      return;
    }
    if(!roomRent){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Please enter the room rent"
        }
      });
      return;
    }
    if(amentiesList.length == 0){
      this.props.setData({
        errorModalInfo : {
          showModal : true,
          message : "Please select an amenity"
        }
      });
      return;
    }
    this.props.saveRoom(this.state);
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

  onBackPress = () => {
    Actions.ownerPage();
  }

  render() {
      return (
        <Container>
          <Carousel />
          <Loading />
          <Header headerText={ 'ADD ROOM' } onBackPress={this.onBackPress}/>
            <Content style={{
              backgroundColor : Color.backgroundThemeColor,
              paddingLeft : "4%",
              width : "100%",
              paddingRight : "4%"
            }}>
                  <KeyboardAvoidingView behavior={Platform.select({android: "padding", ios: 'padding'})}
                  enabled>
                    <View style={{ marginTop : 16, position: 'relative'}}>
                        
                        {
                          this.state.imageList.length > 0 && this.showGallery()
                        }
                        
                        {
                          this.addImage()
                        }


                        <View style={{ ...viewObj }}>
                          <Text 
                            style={{
                              ...textObj
                            }}>Room Name</Text>
                          <TextInput
                            underlineColorAndroid="#bbb"
                            placeholder="e.g. Room1"
                            style={{
                              paddingLeft : 16,
                              paddingBottom : 2,
                              height : 40,
                              marginTop : 12
                            }}
                            onChangeText={roomName => {
                              this.setState({ roomName });
                            }}/>
                        </View>


                        <View style={{ ...viewObj }}>
                          <Text 
                            style={{
                              ...textObj
                            }}>RoomRent (per month)</Text>
                          <TextInput
                            underlineColorAndroid="#bbb"
                            placeholder="e.g. 6000"
                            keyboardType="numeric"
                            style={{
                              paddingLeft : 16,
                              paddingBottom : 2,
                              height : 40,
                              marginTop : 12
                            }}
                            onChangeText={roomRent => {
                              this.setState({ roomRent });
                            }}/>
                        </View>

                        {
                          this.amenitiesList()
                        }

                      </View>
                  </KeyboardAvoidingView>
              </Content>
              <Footer
                    style={{ backgroundColor: Color.themeColor }}>
                    <TouchableOpacity
                      style={{
                        alignItems : 'center',
                        justifyContent : 'center',
                        width : '100%'
                      }}
                      onPress={e => {
                        this.addRoom();
                      }}
                    >
                      <Text style={{ fontSize : 14, color : Color.themeFontColor }}>ADD</Text>
                    </TouchableOpacity>
                  </Footer>
              <Camera type="camera" showCamera={this.state.showCamera} hideCamera={this.hideCamera} getAwsImageUrl={this.getAwsImageUrl} />
        </Container>
      );
  }
}

function mapStateToProps(state, props) {
  return {
      amenitiesList : state.testReducer.amenitiesList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAmenities,
    setData,
    saveRoom
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRoom);


let viewObj = {
  marginTop : 20, 
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