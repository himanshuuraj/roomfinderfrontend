import React, {Component} from 'react';
import {
  Item,
  Input
} from "native-base";
import {
  getHeight
} from "../global/util";
import { Col } from 'react-native-easy-grid';

export default class EnterOTP extends Component{

    otpTextInput = [];
    inputValue = [];

    constructor(props){
        super(props);
        this.props.updateOTP('');
    }

    updateOTP = (v, j) => {
        let otp = "";
        //console.log(this.otpTextInput[0]);
        this.inputValue[j] = v;
        this.inputValue.forEach(item => {
            if(item)
                otp += item;
        });
        this.props.updateOTP(otp);
    }

    renderInputs() {
        const inputs = Array(6).fill(0);
        const txt = inputs.map(
            (i, j) => <Col key={j} style={{ marginLeft : j != 0 ? 6 : undefined }}><Item regular>
                <Input
                    style={{ borderRadius: 10, height: getHeight(5), width : 30, textAlign: 'center', color : 'white'  }}
                    keyboardType="numeric"
                    maxLength={1}
                    onChangeText={(v) => {
                        this.focusNext(j, v);
                        this.updateOTP(v, j);
                    }}
                    onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}
                    ref={ref => this.otpTextInput[j] = ref}
                />
            </Item></Col>
        );
        return txt;
    }
    
    focusPrevious(key, index) {
        if (key === 'Backspace' && index !== 0)
            this.otpTextInput[index - 1]._root.focus();
    }
    
    focusNext(index, value) {
        if (index < this.otpTextInput.length - 1 && value)
            this.otpTextInput[index + 1]._root.focus();
    }

    render(){
        return ( this.renderInputs() )
    }

}