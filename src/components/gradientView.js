import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, Text, StatusBar, TouchableOpacity, TouchableHighlight } from 'react-native';
import { setData } from "./../redux/action";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Button } from "native-base";
import { LinearGradient } from 'expo';

let { width, height } = Dimensions.get('window');
width = width;
// height = width * 0.8;

class GradientView extends Component {

    render() {
        let {w, h, flex, v} = this.props;
        return (
            <LinearGradient
                colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
                start={v ? {x: 0.0, y: 0.0} : {x: 0.0, y: 1.0}} end={v ? {x: 0.0, y: 1.0} : {x: 1.0, y: 1.0}}
                style={{justifyContent: 'center', height : h, width: w, flex}}
            >
                {this.props.children}
            </LinearGradient>
        ); 
    }
  }

  function mapStateToProps(state, props) {
    return {
      carouselData : state.testReducer.carouselData || {}
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      setData
    }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GradientView);
