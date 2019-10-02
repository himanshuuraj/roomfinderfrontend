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
} from "../../global/util";
// import Location from "./../components/location";
import Carousel from "../../components/carousel";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { setData, deleteRoom } from "../../redux/action";
import { Actions } from 'react-native-router-flux';
import Header from "./../../components/header";

let { width } = Dimensions.get('window');

class RoomDetails extends Component {

  constructor(props){
    super(props);
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
      {
        this.props.selectedRoom.imageList && this.props.selectedRoom.imageList.length > 0 &&
        (
        <View style={{ flexDirection : 'row' }}>
            <ScrollView horizontal pagingEnabled>
              {this.props.selectedRoom.imageList.map((image, index) => {
                return (
                  <TouchableOpacity 
                    onPress={() => {
                      // let imageList = this.state.imageList;
                      // let image = imageList.splice(index, 1);
                      // imageList.unshift(...image);
                      this.props.setData({
                        carouselData : {
                          show : true,
                          imageList : this.props.selectedRoom.imageList
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
    Actions.pop();
  }

  render() {
    let { selectedRoom } = this.props;
    return (
      <Container>
        <Carousel />
        <Header headerText={ selectedRoom.roomName } onBackPress={this.onBackPress}/>
        <Content style={{
          width : "100%",
          padding : 16,
          backgroundColor : Color.backgroundThemeColor
        }}>
            {
              selectedRoom.imageList && selectedRoom.imageList.length > 0 && this.showGallery()
            }

            {
              selectedRoom.amentiesList && selectedRoom.amentiesList.length > 0 && (
                <View style={{ ...viewObj, paddingTop : 5 }}>
                  <Text style={{
                    ...textObj
                  }}>Amenities</Text>
                  <View style={{ flexDirection : 'row', marginTop : 5, flexWrap : 'wrap'}}>
                    {
                      selectedRoom.amentiesList.map((item, index) => {
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
                </View>
              )}

              <View style={{ ...viewObj, justifyContent: 'center' }}>
                  <Text style={{
                    ...textObj
                  }}>Room Rent</Text>
                  <Text>{'Rs. ' + selectedRoom.roomRent + " per month"}</Text>
              </View>
            
        </Content>
        <Footer style={{
          backgroundColor : Color.themeColor
        }}>
          <FooterTab>
            <Button 
              onPress={e => {
                Actions.editRoom();
                this.props.setData({ userInfo : {...this.props.userInfo} });
              }}
              style={{ backgroundColor : Color.themeColor }}>
              <Text style={{ color : Color.white }}>EDIT</Text>
            </Button>
            <Button 
              onPress={e => {
                this.props.deleteRoom();
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
    selectedRoom : state.testReducer.selectedRoom,
    userInfo : state.testReducer.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setData,
    deleteRoom
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetails);

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