import React, {Component} from 'react';
import {
  Text, 
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Content,
  Icon,
  Header,
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
      searchedItem: {}
    };
  }

  componentDidMount(){
    
  }

  render() {
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
                value={this.state.searchText}
              />
              <Icon name="md-home" />
            </Item>
        </Header>
        {
          this.state.searchText && (
            <View style={{
                  marginHorizontal : 10
                }}>
                {
                  this.state.areaList.filter(item => this.state.searchText && item.name.toLowerCase().includes(this.state.searchText.toLowerCase()))
                  .map((item, index) => <TouchableOpacity 
                  key={index}
                  style={{
                    height : 40,
                    width : '100%',
                    paddingLeft : 16,
                    borderRadius : 4,
                    display : 'flex',
                    justifyContent : 'center',
                    borderWidth: 1,
                    borderColor: 'black'
                  }}
                  onPress={e => {
                    this.setState({
                      searchedItem : item,
                      searchText : item.name
                    });
                  }}>
                    <Text style={{ fontSize : 16 }}> { item.name } </Text>
                  </TouchableOpacity>)
                }
            </View>
          )
        }
        {
          !this.state.searchText && (
            <View style={{
              flexDirection : 'row',
              height: getHeight(6)
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
          !this.state.searchText && (
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
          !this.state.searchText && (
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
