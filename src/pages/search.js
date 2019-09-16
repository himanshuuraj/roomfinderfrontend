import React, {Component} from 'react';
import {
  Text, 
  View,
  Picker,
  TouchableOpacity,
  Image,
  platform,
  ScrollView,
  StatusBar
} from 'react-native';
import {
  Container,
  Content,
  Icon,
  Header,
  Card,
  Footer,
  Item,
  Input,
  Button
} from "native-base";
import {
  getFont,
  Color,
  getHeight
} from "../global/util";
import HouseCardItem from "./../components/houseCardItems";
import SearchableDropdown from 'react-native-searchable-dropdown';

var items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];

export default class SearchPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      areaList : [
        { name : "Boring Road", id: "boringRoad" },
        { name : "Beijing Road", id: "beijingroad" },
        { name : "Danapur", id: "danapur" },
        { name : "Gandhi maidan", id: "gandhiMaidan" },
        { name : "Aise hi kuch v", id: "aisehikuchv" }
      ],
      searchArea : "",
      selectedItems: []
    };
  }

  componentDidMount(){}

  render() {
    let { areaList, searchText, selectedItems } = this.state;
    return (
      <Container style={{}}>
        <Header backgroundColor="#2196F3" searchBar rounded autoCorrect={false} style={{backgroundColor: Color.themeColor, marginTop: StatusBar.currentHeight}}>
            <Item>
              <Icon name="ios-search" />
              <Input
                onChangeText={searchText => {
                  this.setState({ searchText });
                }}
                placeholder="Area Name (eg. Boring Road)"
              />
              <Icon name="md-home" />
            </Item>
            {
              (
              <View style={{
                  position: 'absolute',
                  width: '100%',
                  top: 50
              }}>
              {
              areaList.filter(item => searchText && item.name.toLowerCase().includes(searchText.toLowerCase()))
              .map((item, index) => {
                return (<View key={index} style={{
                            height : getHeight(6),
                            borderWidth : 1,
                            borderRadius : 5,
                            width : '100%',
                            borderColor : "#bbb",
                            padding : 5
                          }}>
                          <Text> { item.name } </Text>
                        </View>)
                  })
                }
              </View>
              )
            }


          {/* <View style={{ width : '100%'}}>
            <SearchableDropdown
              onItemSelect={(item) => {
                const items = this.state.selectedItems;
                items.push(item)
                this.setState({ selectedItems: items });
              }}
              containerStyle={{ padding: 5 }}
              onRemoveItem={(item, index) => {
                const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                this.setState({ selectedItems: items });
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight : 250, width : '100%', zIndex : 9999 }}
              items={this.state.areaList}
              resetValue={false}
              textInputProps={
                {
                  placeholder: "Area Name (eg. Boring Road)",
                  underlineColorAndroid: "transparent",
                  style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                  },
                  onTextChange: searchText => {
                    // let selectedItems = areaList.filter(item => searchText && item.name.toLowerCase().includes(searchText.toLowerCase()));
                    // console.log(selectedItems, "SELECTEDITEMS");
                    // this.setState({ selectedItems });
                  }
                }
              }
              
        />
        </View>
         */}
        </Header>
        {
          !searchText && (
            <View style={{
              flexDirection : 'row',
              height: getHeight(6),
              marginTop : (selectedItems && selectedItems.length > 0) ? 250 : 0
              //marginTop: 6 * getHeight(6)
          }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems : 'center', borderWidth: 1, borderColor: '#eee'}}>
                <Icon size={10} name="ios-funnel"/>
                <Text style={{fontSize: 14}}> Filter </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems : 'center', borderWidth: 1, borderColor: '#eee'}}>
                <Icon size={10} name="ios-funnel"/>
                <Text style={{fontSize: 14}}> Sort </Text>
            </View>
          </View>
          )
        }
        {
          !searchText && (
            <Content style={{
              paddingLeft : "5%",
              width : "100%",
              paddingRight : "5%"
            }}>
                  {
                      [...Array(10)].map((item, index) => <HouseCardItem key={index} page={'search'}/>)
                  }
            </Content>
          )
        }
        { 
          !searchText && (
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
          )
        }
        </Container>
    );
  }
}
