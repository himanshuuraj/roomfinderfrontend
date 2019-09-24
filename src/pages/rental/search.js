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
import { getAreas } from "../../redux/action";

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
                  this.setState({ searchText, showDropDown : true });
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
                  this.state.showDropDown &&
                  this.props.areaList.filter(item => this.state.searchText && item.name.toLowerCase().includes(this.state.searchText.toLowerCase()))
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
                          searchText : item.name,
                          showDropDown : false
                        });
                        Keyboard.dismiss();
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

function mapStateToProps(state, props) {
  return {
    areaList : state.testReducer.areaList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAreas
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);