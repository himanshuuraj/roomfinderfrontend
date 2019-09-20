import React, {Component} from 'react';
import {
  Platform,
  Button,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';
import {
  Container,
  Content
} from "native-base";
import {
  Color, getHeight
} from "./../global/util";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {
  getApartments
} from "./../redux/action";
import { Actions } from 'react-native-router-flux';

class OwnerPage extends Component {

  constructor(props){
    super(props);
    this.state = {
        apartmentList : [{
            apartmentId : 1,
            apartmentName : "Apartment Name"
        }]
    }
  }

  componentDidMount(){
    this.props.getApartments();
  }

  separator = () => {
    return <View style={{
        marginVertical: 8,
        width : 200,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }} />;
  }

  render() {
    return (
      <Container>
        <View style={{
            paddingLeft : "4%",
            paddingRight : "4%",
            marginTop: StatusBar.currentHeight,
            backgroundColor : "#eee",
            flex : 1,
            justifyContent : 'center',
            alignItems : 'center'
        }}>
                <Text style={{
                        fontSize: 24,
                        marginBottom : 20
                    }}>
                    Your Houses
                </Text>
                {
                    this.props.allApartments.map((item, index) =>
                        <TouchableOpacity 
                        onPress={e => {
                          
                        }}
                        style={{
                            backgroundColor : 'white',
                            width : 200,
                            height : getHeight(5),
                            justifyContent : 'center',
                            alignItems : 'center',
                            borderRadius : 8,
                            marginBottom : 8
                        }} key ={index}>
                            <Text style={{ fontSize : 16 }}> 
                                { item.apartmentName }
                            </Text>
                        </TouchableOpacity>
                    )
                }
                {
                    this.separator()
                }
                <TouchableOpacity
                    style={{
                        width : 200,
                        height : getHeight(5),
                        borderRadius : 8,
                        justifyContent : 'center',
                        alignItems : 'center',
                        backgroundColor : Color.themeColor
                    }}
                    onPress={() => {
                        Actions.addApartment();
                    }}
                >
                    <Text style={{ fontSize : 16, color : Color.themeFontColor, textAlign: 'center' }}> 
                        Add 
                    </Text>
                </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    allApartments : state.testReducer.allApartments
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getApartments
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerPage);
