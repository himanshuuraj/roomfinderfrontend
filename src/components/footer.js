import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {
    TouchableOpacity,
    StatusBar,
    Text,
    Dimensions
} from "react-native";
import { Footer, Icon } from "native-base";
import { testAction } from "./../redux/action";
import { Color, getFont } from "./../global/util";
import GradientView from './gradientView';
const width = Math.round(Dimensions.get('window').width);  
const height = Math.round(Dimensions.get('window').height);  

class FooterPage extends Component {

    render() {
        return (
            <Footer>
                <GradientView w={width} h={'100%'}>
                    { this.props.children }
                </GradientView>
              </Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterPage);

