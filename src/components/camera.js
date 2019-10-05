import React, {Component} from 'react';
import {
  Platform,
  Text, 
  View,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { DocumentPicker, ImagePicker } from 'expo';
import { Color, getHeight } from '../global/util';
import { uploadOnAWSRequest } from "../global/request";


import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { screenHeight, screenWidth } from '../redux/constants';
import { setData } from "./../redux/action";
class CameraPage extends Component {

  state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      image : null,
      showCamera : false
  };

  camera = null;

  _pickImage = async () => {
      this.props.setData({
        loading : {
          show : true
        }
      });
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this.ajaxCall(result);
      console.log(result)

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };

  ajaxCall = async (obj, source = 'gallery') => {
      var data = new FormData();
      let v = obj.uri.split('/');
      v = v[v.length - 1];
      data.append('file', {
          uri: obj.uri,
          type: 'image/*',
          name: v
      });
      console.log(data);
      try{
        let response = await uploadOnAWSRequest(data);
        if(response.success){
          this.props.getAwsImageUrl(response.message);
        }else{
            this.props.setData({
              errorModalInfo : {
                showModal : true,
                message : response.message
              }
            });
        }
      }catch(err){
        this.props.setData({
          errorModalInfo : {
            showModal : true,
            message : SON.stringify(err)
          }
        });
      }
      this.props.setData({
        loading : {
          show : false
        }
      });
      if(source == 'camera')
        this.props.hideCamera();
  }

  snap = async () => {
    this.props.setData({
      loading : {
        show : true
      }
    });
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.ajaxCall(photo, 'camera');
    }else{
      this.props.setData({
        loading : {
          show : false
        },
        errorModalInfo : {
          showModal : true,
          title : "Oops!",
          message : "Cannot load camera"
        }
      });
    }
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, showCamera } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if(this.props.showCamera && this.props.type == "camera"){
      return (
        <View style={{ position : 'absolute', height : screenHeight, width : screenWidth, top: StatusBar.currentHeight, left : 0 }}>
            <View style={{flex : 1}}>
                <Camera 
                ref={ref => {
                    this.camera = ref;
                }} style={{ flex: 1 }} type={this.state.type}>
                    <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            style={{
                              position : 'absolute',
                              top : StatusBar.currentHeight,
                              right : 10,
                              borderWidth : 1,
                              borderColor : Color.white,
                              borderRadius : 4,
                              justifyContent : 'center',
                              alignItems : 'center',
                              height : 36,
                              paddingHorizontal : 20
                            }}
                            onPress={() => {
                              this.props.hideCamera();
                          }}>
                          <Text style={{ fontSize: 18, color: 'white'}}> CLOSE </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          style={{
                            position : 'absolute',
                            bottom : 10,
                            left : 10,
                            borderWidth : 1,
                            borderColor : Color.white,
                            borderRadius : 4,
                            width : 60,
                            justifyContent : 'center',
                            alignItems : 'center',
                            height : 36
                          }}
                          onPress={() => {
                          this.setState({
                              type:
                              this.state.type === Camera.Constants.Type.back
                                  ? Camera.Constants.Type.front
                                  : Camera.Constants.Type.back,
                          });
                        }}>
                          <Text style={{ fontSize: 18, color: 'white' }}> Flip </Text>
                      </TouchableOpacity>
                    </View>
                </Camera>
           </View>
           <View style={{height: getHeight(6)}}>
                <TouchableOpacity style={{
                    width: '100%',
                    height: '100%',
                    justifyContent : 'center',
                    alignItems : 'center',
                    backgroundColor : Color.themeColor
                }} onPress={() => {
                    this.snap();
                }}>
                    <Text style={{ 
                      color : 'white',
                      fontSize : 18
                    }}>Save Image</Text>
                </TouchableOpacity>
           </View>
        </View>
      );
    }else if(this.props.type == "gallery"){
      return (
        <TouchableOpacity
            style={{
              borderWidth : 1,
              borderColor : Color.black,
              borderRadius : 4,
              justifyContent : 'center',
              alignItems : 'center',
              marginVertical : 8,
              height : 36
            }}
            onPress={this._pickImage}
          >
            <Text style={{ fontSize : 14 }}>ADD IMAGE FROM GALLERY</Text>
          </TouchableOpacity>
      );
    }else{
      return null;
    }
  }
}

function mapStateToProps(state, props) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);
