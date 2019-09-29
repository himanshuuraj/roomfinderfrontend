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
  Dimensions
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
import { saveRoom } from "../../redux/action";
import Carousel from "./../../components/carousel";
let { width } = Dimensions.get('window');
const height = width * 0.8
class AddRoom extends Component {

  state = {
    amentiesList : [],
    imageList : [],
    modalVisible: true,
    showImageOption : false,
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
      <Card style={{
        paddingHorizontal : 4,
        paddingVertical : 8
      }}>
      <Text style={{
        marginBottom : 4,
        fontWeight : 'bold',
        fontSize : 14
      }}>Select Amenities</Text>
        <View style={{ 
          flexDirection : 'row',
          flexWrap : 'wrap',
          justifyContent : 'space-between'
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
                      this.setState(amentiesList);
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
      </Card>
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
    imageList.push({imageUrl});
    this.setState({ imageList });
  }

  addImage = () => {
    return (
      <View>
        <View style={{ marginBottom : 8 }}>
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
              this.setState({ showCamera : true });
            }}
          >
            <Text style={{ fontSize : 16 }}>From Camera</Text>
          </TouchableOpacity>
          <Camera type={'gallery'} getAwsImageUrl={this.getAwsImageUrl} /> 
        </View>

        <Button
          onPress={e=> {
            this.setState({ showImageOption : true })
          }}
          style={{
            backgroundColor : Color.themeColor,
            color : Color.themeColor
          }} title={'Add Image'} />
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
                </TouchableOpacity>
              )
            })}
          </ScrollView>
      </View>
    </View>);
  }

  addRoom = () => {
    let { amentiesList, images } = this.state;
    if(amentiesList.length == 0){
      alert("Please select an amenity");
      return;
    }
    this.props.saveRoom(this.state);
  }

  render() {
      return (
        <Container>
            <Content style={{
              backgroundColor : Color.backgroundThemeColor,
              paddingLeft : "4%",
              width : "100%",
              paddingRight : "4%",
              marginTop: StatusBar.currentHeight
            }}>
                  <KeyboardAvoidingView behavior={Platform.select({android: "padding", ios: 'padding'})}
                  enabled>
                    <View style={{ marginTop : 40, position: 'relative'}}>
                        
                        {
                          this.state.imageList.length > 0 && this.showGallery()
                        }

                        {/* <View style={styles.container}>
                          <Carousel images={this.state.imageList.map(item => { 
                            let obj = {
                              uri : item.imageUrl
                            };
                            return obj;
                          })} />
                        </View> */}
                        
                        {
                          this.addImage()
                        }

                      <Text>Name</Text>
                      <TextInput
                        underlineColorAndroid="#bbb"
                        style={{
                          paddingLeft : 16,
                          paddingBottom : 4
                        }}
                        onChangeText={roomName => {
                          this.setState({ roomName });
                        }}
                        value={this.state.apartmentName}/>

                      <Text>RoomRent</Text>
                      <TextInput
                        underlineColorAndroid="#bbb"
                        style={{
                          paddingLeft : 16,
                          paddingBottom : 4
                        }}
                        onChangeText={roomRent => {
                          this.setState({ roomRent });
                        }}
                        value={this.state.roomRent}/>

                        {
                          this.amenitiesList()
                        }                   

                        <Button title={'ADD'} onPress={e => {
                          this.addRoom();
                        }}/>

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