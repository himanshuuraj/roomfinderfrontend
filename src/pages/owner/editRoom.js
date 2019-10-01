import React, {Component} from 'react';
import {
  Platform,
  Button,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
  TouchableHighlight
} from 'react-native';
import {
  Container,
  Content,
  Card,
  Footer
} from "native-base";
import {
  Color
} from "../../global/util";
import { getAmenities, setData, updateRoom } from "../../redux/action";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Camera from "../../components/camera";
import { saveRoom } from "../../redux/action";
import Carousel from "../../components/carousel";
import Loading from "../../components/loading";
import Header from "./../../components/header";
let { width } = Dimensions.get('window');
const height = width * 0.8
class EditRoom extends Component {

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
      let nextProps = this.props;
      this.setState({
        ...nextProps.selectedRoom
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

  updateRoom = () => {
    let { amentiesList, roomName, roomRent } = this.state;
    if(!roomName){
      alert("Please enter a room name");
      return;
    }
    if(!roomRent){
      alert("Please enter the room rent");
      return;
    }
    if(amentiesList.length == 0){
      alert("Please select an amenity");
      return;
    }
    this.props.updateRoom(this.state);
  }

  onBackPress = () => {
    Actions.pop();
  }

  render() {
      return (
        <Container>
          <Carousel />
          <Loading />
          <Header headerText={ 'EDIT ROOM' } onBackPress={this.onBackPress}/>
            <Content style={{
              backgroundColor : Color.backgroundThemeColor,
              paddingLeft : "4%",
              width : "100%",
              paddingRight : "4%"
            }}>
                  <KeyboardAvoidingView behavior={Platform.select({android: "padding", ios: 'padding'})}
                  enabled>
                    <View style={{ marginTop : 10, position: 'relative'}}>
                        
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
                            }} 
                            value={this.state.roomName}/>
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
                            }}
                            value={this.state.roomRent}/>
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
                        this.updateRoom();
                      }}
                    >
                      <Text style={{ fontSize : 14, color : Color.themeFontColor }}>UPDATE</Text>
                    </TouchableOpacity>
                  </Footer>
              <Camera type="camera" showCamera={this.state.showCamera} hideCamera={this.hideCamera} getAwsImageUrl={this.getAwsImageUrl} />
        </Container>
      );
  }
}

function mapStateToProps(state, props) {
  return {
      amenitiesList : state.testReducer.amenitiesList,
      selectedRoom : state.testReducer.selectedRoom
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAmenities,
    setData,
    saveRoom,
    updateRoom
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRoom);


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