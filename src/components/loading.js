import React, { Component } from 'react';
import { View, Dimensions, StatusBar, ActivityIndicator, Text } from 'react-native';
import { setData } from "./../redux/action";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Color } from '../global/util';
 
let { width, height } = Dimensions.get('window');
width = width;

class Loading extends Component {

    render() {
        let loading = this.props.loading;
        if(!loading.show)
            return null;
        return (
            <View style={{
                position : 'absolute',
                height,
                width,
                zIndex : 1,
                justifyContent : 'center',
                alignItems : 'center',
                backgroundColor : "rgba(52, 52, 52, 0.6)",
                marginTop : StatusBar.currentHeight
            }}>
                <ActivityIndicator size="large" color={Color.black} />
                <Text style={{ marginTop : 10, fontSize : 16, color : Color.black }}>
                    Loading ....
                </Text>
            </View>
        );
    }
  }

  function mapStateToProps(state, props) {
    return {
        loading : state.testReducer.loading
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Loading);
