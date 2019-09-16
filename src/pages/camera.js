import React, {Component} from 'react';
import {
  Platform,
  Text, 
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import {
  Container,
  Content,
  Badge,
  CheckBox,
  Button,
  Icon
} from "native-base";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { DocumentPicker, ImagePicker } from 'expo';
import {
  HOST
} from "./../global/api";

export default class CameraPage extends Component {

state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    image : null
};

camera = null;

_pickImage = async () => {
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

ajaxCall = async (obj) => {
    const url = HOST + '/upload';
    var data = new FormData();
    //data.append("image", obj);
    let v = obj.uri.split('/');
    v = v[v.length - 1];
    let type = v.split(".")[1];
    data.append('file', {
        uri: obj.uri,
        type: 'image/*',
        name: v
    });
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("POST", url);
    xhr.send(data);

}

snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.ajaxCall(photo);
      //console.log(photo);
    }
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, image } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
            <View style={{height: '80%'}}>
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
                        flex: 0.1,
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        }}
                        onPress={() => {
                        this.setState({
                            type:
                            this.state.type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back,
                        });
                        }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                    </TouchableOpacity>
                    </View>
                </Camera>
                
                {/* <View style={{ 'marginTop': 20}}>
                    <TouchableOpacity
                    onPress={this._pickImage}
                    >
                    <Text>Select Image</Text>
                    </TouchableOpacity>
                    {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View> */}
           </View>
           <View style={{height: '20%'}}>
                <TouchableOpacity style={{
                    width: '100%',
                    height: '100%',
                    justifyContent : 'center',
                    alignItems : 'center'
                }} onPress={() => {
                    this.snap();
                }}>
                    <Text>Touch Here</Text>
                </TouchableOpacity>
           </View>
        </View>
      );
    }
  }
}
