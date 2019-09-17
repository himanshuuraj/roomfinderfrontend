import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';

let { width } = Dimensions.get('window');
width = width - 36;
const height = width * 0.8;

export default class Carousel extends Component {
    render() {
      const { images } = this.props;
      if (images && images.length) {
        return (
          <View
            style={styles.scrollContainer}
          >
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={true}
            >
              {images.map((image, index) => (
                <Image key={index} style={{ width : width, height : height }} resizeMode="stretch" source={image.source} />
              ))}
            </ScrollView>
          </View>
        );
      }
      return null;    
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight
    },
    scrollContainer: {
      height,
    },
    image: {
      width,
      height,
    },
  });