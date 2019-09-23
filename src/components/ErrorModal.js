import React, {Component}  from 'react';
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Color } from "./../global/util";
const screenWidth = Math.round(Dimensions.get('window').width);  
const screenHeight = Math.round(Dimensions.get('window').height);  

export default class ErrorModal extends Component{
    render(){
        return (
            <View style={{ 
                position : 'absolute', 
                backgroundColor : 'rgb(0,0,0, 1)',
                justifyContent : 'center',
                alignItems : 'center',
                zIndex : 999
            }}>
                <View style={{ width: screenWidth - 48, borderRadius: 8, backgroundColor : 'white', justifyContent : 'center', alignItems : 'center', padding: 16 }}>
                    <Text style={{ fontSize : 18, fontWeight : 'bold' }}>
                        ALERT
                    </Text>
                    <Text style={{ fontSize : 16, textAlign : 'center', marginTop : 10  }}>
                        Welcome to skptricks, I have written and developed this site so that Learner may learn computer science related technologies and various programming
                    </Text>
                    <TouchableOpacity
                        style={{
                            justifyContent : 'center',
                            alignItems : 'center',
                            marginTop : 20,
                            marginBottom : 5,
                            height : 36,
                            width : '100%',
                            backgroundColor : Color.themeColor
                        }}
                        onPress={e => {}}
                    >
                        <Text style={{ fontSize : 14, color : Color.themeFontColor, fontWeight: 'bold', textAlign : 'center' }}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}