import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, Text, StatusBar, TouchableOpacity, TouchableHighlight } from 'react-native';
import { setData } from "./../redux/action";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Button } from "native-base";

let { width, height } = Dimensions.get('window');
width = width;
// height = width * 0.8;

class Carousel extends Component {

    componentDidMount(){
      //this.refs.scrollView.scrollTo(2);
    }

    render() {
      const { carouselData } = this.props;
      let myScroll;
      if(!carouselData.show)
        return null;
      else if (carouselData && carouselData.imageList && carouselData.imageList.length > 0) {
        return (
          <View
            style={styles.scrollContainer}
          >
            <ScrollView
              horizontal
              pagingEnabled
            >
              {carouselData.imageList.map((image, index) => {
                return (
                  <View key={index} style={{ width : width, height : height, paddingHorizontal : 16 }}>
                    <Image resizeMode="contain" source={image} style={{ flex : 1 }} />
                  </View>
                )
              })}
            </ScrollView>
            <TouchableOpacity style={{ 
              position : 'absolute', 
              top : 20, 
              right : 10, 
              padding : 10,
              width : 200,
              alignItems : "flex-end"
            }}
            onPress={e => {
              this.props.setData({
                carouselData : {
                  show : false
                }
              });
            }}
            title={'X'}
            >

              <Text style={{ fontSize : 24, fontWeight : 'bold', color : 'white' }}>
                X
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
      return null;    
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Carousel);

  const styles = StyleSheet.create({
    scrollContainer: {
      height,
      position : 'absolute',
      zIndex : 1,
      backgroundColor : "rgba(52, 52, 52, 0.8)",
      marginTop : StatusBar.currentHeight
    },
    image: {
      width,
      height,
    },
  });

