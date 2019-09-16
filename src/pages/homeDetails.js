import React, {Component} from 'react';
import {
  Text, 
  View,
  TouchableOpacity,
  Image,
  ScrollView
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
  getHeight
} from "../global/util";
import Location from "./../components/location";
import HouseCardItem from "./../components/houseCardItems";

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
    id : "foodpreferance",
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
]

export default class HomeDetails extends Component {

  state = {
    phone : "",
    password : ""
  };

  constructor(props){
    super(props);
  }

  componentDidMount(){
    //setTimeout(() => this.props.moveToScreen("registeration"), 5000);
  }

  render() {
    return (
      <Container>
        <Header style={{
          backgroundColor : Color.themeColor,
          alignItems : "center",
          justifyContent : "flex-start",
          paddingLeft : "5%"
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
              Bipul Belmonte
            </Text>
          </TouchableOpacity>
        </Header>
      <Content style={{
        paddingLeft : "5%",
        width : "100%",
        paddingRight : "5%"
      }}>
          <Card style={{
            marginTop : getHeight (5)
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
                      item.id === 'address' && (
                        <View style={{ padding : '5%' }}>
                            <Text style={{color : '#4a4a4a'}}> line1 </Text>
                            <Text style={{color : '#4a4a4a'}}> line2 </Text>
                            <Text style={{color : '#4a4a4a'}}> city </Text>
                            <Text style={{color : '#4a4a4a'}}> state </Text>
                            <Text style={{color : '#4a4a4a'}}> pincode </Text>
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
            <ScrollView horizontal={true} style={{marginBottom : getHeight(2)}}>
            {
              [...Array(10)].map((item, index) => ( <HouseCardItem key={index} />))
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
