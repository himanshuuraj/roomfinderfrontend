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
import Carousel from "../../components/carousel";
import { Constants } from 'expo';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { setData } from "../../redux/action";
import { Actions } from 'react-native-router-flux';

let { width } = Dimensions.get('window');
const height = width * 0.8

class RoomDetails extends Component {

  constructor(props){
    super(props);
  }

  render() {
      let { selectedRoom } = this.props;
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
              { selectedRoom.roomName }
            </Text>
          </TouchableOpacity>
        </Header>
        <Content style={{
          width : "100%",
          paddingHorizontal : 16
        }}>
            <View style={styles.container}>
                <Carousel images={selectedRoom.imageList.map(item => { 
                            let obj = {
                              uri : item.imageUrl
                            };
                            return obj;
                          })} />
            </View>
            {
              selectedRoom.amentiesList && selectedRoom.amentiesList.length > 0 && (
                <Card style={{ paddingHorizontal : 16, paddingVertical : 16, marginTop : 16 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}> Amenities </Text>
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
                </Card>
              )}

          <View 
            style={{ 
              paddingHorizontal : 16, 
              paddingVertical : 8,
              marginRight : 8, 
              marginTop : 10,
              borderWidth : 1,
              borderColor : '#ccc'
            }}>
              <Text>Room Rent - { selectedRoom.roomRent }</Text>
          </View>
            
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
    selectedRoom : state.testReducer.selectedRoom,
    userInfo : state.testReducer.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetails);

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
