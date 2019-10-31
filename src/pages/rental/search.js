import React, {Component} from 'react';
import {
  Text, 
  View,
  StatusBar,
  TouchableOpacity,
  Keyboard
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
} from "../../global/util";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import HouseCardItem from "../../components/houseCardItems";
import { getAreas, getSearchedHouses } from "../../redux/action";

class SearchPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchArea : "",
      searchedItem: {},
      showDropDown : false
    };
  }

  componentDidMount(){
    this.props.getAreas();
  }

  render() {
    return (
      <Container style={{}}>
        <Header backgroundColor="#2196F3" searchBar rounded autoCorrect={false} style={{backgroundColor: Color.themeColor, marginTop: StatusBar.currentHeight}}>
            <Item>
              <Icon name="ios-search" />
              <Input
                onChangeText={searchText => {
                  this.setState({ searchText : searchText, showDropDown : true });
                  if(!searchText)
                    Keyboard.dismiss();
                }}
                placeholder="Area Name (eg. Boring Road)"
                value={this.state.searchText}
              />
              <Icon name="md-home" />
            </Item>
        </Header>
        <Content>
        {
          this.state.searchText ? (
            <View style={{
                  marginHorizontal : 10
                }}>
                {
                  this.state.showDropDown &&
                  this.props.areaList.filter(item => {
                    return item.area.toLowerCase().includes(this.state.searchText.toLowerCase());
                  })
                    .map((item, index) => {
                      return (
                        <TouchableOpacity 
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
                              searchText : item.area,
                              showDropDown : false
                            });
                            Keyboard.dismiss();
                            this.props.getSearchedHouses(item.id);
                          }}>
                            <Text style={{ fontSize : 16 }}> { item.area } </Text>
                        </TouchableOpacity>
                      );
                    })
                }
            </View>
          ) : null
        }
        {
          !this.state.searchText ? (
            <View style={{
              flexDirection : 'row',
              height: getHeight(6)
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
          ) : null
        }
        {
          (this.state.searchText && !this.state.showDropDown) ? (
            <Content style={{
              paddingLeft : "5%",
              width : "100%",
              paddingRight : "5%"
            }}>
                  {
                      this.props.apartmentList.map((item, index) => <HouseCardItem key={index} page={'search'}/>)
                  }
            </Content>
          ) : null
        }
        </Content>
        { 
          (this.state.searchText && !this.state.showDropDown) ? (
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
          ) : null
        }
        </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    areaList : state.testReducer.areaList,
    apartmentList : state.testReducer.apartmentList || []
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAreas,
    getSearchedHouses
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);