import React, {Component}  from 'react';
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Color } from "./../global/util";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { setData } from "./../redux/action";

const screenWidth = Math.round(Dimensions.get('window').width);  
const screenHeight = Math.round(Dimensions.get('window').height);  


class ErrorModal extends Component{
    render(){
        let errorModalInfo = this.props.errorModalInfo || {};
        if(!errorModalInfo.showModal)
            return null;
        errorModalInfo.title = errorModalInfo.title || "ALERT";
        errorModalInfo.message = errorModalInfo.message || "This is a message";
        errorModalInfo.buttonText = errorModalInfo.buttonText || "OK";
        errorModalInfo.onClose = errorModalInfo.onClose ? errorModalInfo.onClose : () => this.props.setData({ errorModalInfo: { showModal : false }});
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
                        { errorModalInfo.title }
                    </Text>
                    <Text style={{ fontSize : 16, textAlign : 'center', marginTop : 10  }}>
                        { errorModalInfo.message }
                    </Text>
                    <TouchableOpacity
                        style={{
                            justifyContent : 'center',
                            marginTop : 20,
                            marginBottom : 5,
                            height : 36,
                            width : '100%',
                            backgroundColor : Color.themeColor,
                            borderRadius : 4
                        }}
                        onPress={e => {
                            errorModalInfo.onClose();
                        }}
                    >
                        <Text style={{ fontSize : 14, color : Color.themeFontColor, fontWeight: 'bold', textAlign : 'center' }}>
                            { errorModalInfo.buttonText }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);