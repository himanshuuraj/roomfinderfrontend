import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {
    View
} from "react-native";
import { testAction } from "./../redux/action";

class HomePage extends Component {

    render() {
        return (
          <View center style={{backgroundColor : 'red'}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

