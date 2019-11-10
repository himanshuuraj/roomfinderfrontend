import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {
    TouchableOpacity,
    StatusBar,
    Text,
    Dimensions
} from "react-native";
import { Header, Icon } from "native-base";
import { testAction } from "./../redux/action";
import { Color, getFont } from "./../global/util";
import GradientView from './gradientView';
const width = Math.round(Dimensions.get('window').width);  
const height = Math.round(Dimensions.get('window').height);  

class HeaderPage extends Component {

    render() {
        return (
            <Header style={{
                alignItems : "center",
                marginTop: StatusBar.currentHeight
              }}>
                <GradientView w={width} h={'100%'}>
                <TouchableOpacity style={{
                    display : "flex",
                    flexDirection : "row",
                    alignItems : "center",
                    marginLeft : 20
                }}
                onPress={e => {
                    this.props.onBackPress();
                }}
                >
                  <Icon name="ios-arrow-back" style={{
                    color : "white",
                    marginRight : 20
                  }}/>
                  <Text style={{
                    fontSize : 18,
                    color : Color.white
                  }}>
                    { this.props.headerText.toUpperCase() }
                  </Text>
                </TouchableOpacity>
                </GradientView>
              </Header>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        data : state.testReducer.test
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        testAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPage);

