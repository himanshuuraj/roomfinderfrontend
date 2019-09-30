import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {
    TouchableOpacity,
    StatusBar,
    Text
} from "react-native";
import { Header, Icon } from "native-base";
import { testAction } from "./../redux/action";
import { Color, getFont } from "./../global/util";

class HeaderPage extends Component {

    render() {
        return (
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
                    { this.props.headerText }
                  </Text>
                </TouchableOpacity>
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

