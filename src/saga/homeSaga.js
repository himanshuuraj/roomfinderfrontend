import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { REGISTER_USER_INFO, SEND_OTP, VERIFY_OTP, VERIFY_EMAIL } from "./../redux/constants";
import { getApiCall, postApiCall } from "./../global/request";
import * as Api from "./../global/api";
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    setData, verifyEmail
} from "./../redux/action";

function* registerUserInfoSaga(action){
    try {
        //let state = yield select();
        let obj = action.userData;
        let response = yield call(postApiCall, Api.apiToRegister, obj );
        console.log("RESPONSE", response);
        if(response.userId){
            yield put(setData({ 'userInfo' : response }));
            yield call(AsyncStorage.setItem, 'userInfo', JSON.stringify(response));
            Actions.verifyMobileNumber();
        }else if(response.err){
            alert(response.err);
            return;
        }
        //let data = yield call(AsyncStorage.getItem, 'userInfo'); 
        //console.log(data, "DATA");
    } catch (e) {
        alert(JSON.stringify(e));
    }
}

function* sendOTPSaga(action){
    try {
        let url = Api.apiToSendOTP + action.phoneNumber;
        let response = yield call(getApiCall, url );
        console.log("RESPONSE", response);
        if(response.err){
            alert(response.err);
            Actions.registerationPage();
        }
    } catch (e) {
        alert(JSON.stringify(e));
    }
}

function* verifyOtpSaga(action){
    try{
        let obj = {
            phoneNumber : action.phoneNumber,
            otp : action.otp
        };
        let response = yield call(postApiCall, Api.apiToVerifyOTP, obj );
        console.log("RESPONSE", response);
        if(response.userId){
            yield call(AsyncStorage.setItem, 'userInfo', JSON.stringify(response));
            Actions.HomeDetails();
        }else if(response.err){
            alert(response.err);
            return;
        }
    }catch(err){
        alert(JSON.stringify(err));
    }
}

function* verifyEmailSaga(action){
    try{
        let obj = {
            email : action.email,
            password : action.password
        };
        let response = yield call(postApiCall, Api.apiToVerifyEmail, obj );
        console.log("RESPONSE", response);
        if(response.userId){
            yield call(AsyncStorage.setItem, 'userInfo', JSON.stringify(response));
            Actions.HomeDetails();
        }else if(response.err){
            alert(response.err);
            //Actions.registerationPage();
            return;
        }
    }catch(err){
        alert(JSON.stringify(err));
    }
}

const mySaga = [
    takeLatest( REGISTER_USER_INFO, registerUserInfoSaga ),
    takeLatest( SEND_OTP, sendOTPSaga),
    takeLatest( VERIFY_OTP, verifyOtpSaga),
    takeLatest( VERIFY_EMAIL, verifyEmailSaga)
];

export default mySaga;