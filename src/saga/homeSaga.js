import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { REGISTER_USER_INFO, SEND_OTP, VERIFY_OTP, VERIFY_EMAIL, SET_USER_TYPE, GET_AREAS, GET_AMENITIES, UPLOAD_PHOTO_ON_AWS } from "./../redux/constants";
import { getApiCall, postApiCall, putApiCall, uploadOnAWSRequest } from "./../global/request";
import * as Api from "./../global/api";
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    setData, verifyEmail
} from "./../redux/action";
import { UserType } from '../global/util';

function* registerUserInfoSaga(action){
    try {
        let obj = action.userData;
        let response = yield call(postApiCall, Api.apiToRegister, obj );
        console.log("RESPONSE", response);
        if(!response.success){
            alert(response.message);
            return;
        }
        let userInfo = response.message;
        yield put(setData({ 'userInfo' : userInfo }));
        yield call(AsyncStorage.setItem, 'userInfo', JSON.stringify(userInfo));
        Actions.verifyMobileNumber();
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
            phoneNumber : action.phoneNumber || 7022623975,
            otp : action.otp || 602225
        };
        let response = yield call(postApiCall, Api.apiToVerifyOTP, obj );
        console.log("RESPONSE", response);
        if(!response.success){
            alert(response.message);
            return;
        }
        if(response.userId){
            yield call(AsyncStorage.setItem, 'userInfo', JSON.stringify(response));
            Actions.HomeDetails();
        }
        let userInfo = response.message;
        yield put(setData({ 'userInfo' : userInfo }));
        yield call(AsyncStorage.setItem, 'userInfo', JSON.stringify(userInfo));
        Actions.optionsPage();
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

function* setUserTypeSaga(action){
    try{
        let state = yield select();
        userInfo = state.testReducer.userInfo;
        userInfo.userType = action.userType;
        let url = Api.apiToUpdateUserInfo + userInfo.userId;
        let response = yield call(putApiCall, url, userInfo );
        console.log("RESPONSE", response);
        if(!response.success){
            alert(response.message);
            return;
        }else{
            let userInfo = response.message;
            yield call(AsyncStorage.setItem, 'userInfo', JSON.stringify(userInfo));
            if(userInfo.mobileNumberVerified && userInfo.userType){
                if(userInfo.userType == UserType.OWNER)
                    Actions.cameraPage();
                else
                    Actions.HomeDetails();
            }
        }
    }catch(err){

    }
}

function* getAreasList(action){
    try{
        let response = yield call(getApiCall, Api.apiToGetAreaList, userInfo );
        console.log("RESPONSE", response);
        if(!response.success){
            alert(response.message);
            return;
        }else{
            yield put(setData({ 'areaList' : response.message }));
        }
    }catch(err){

    }
}

function* getAmenitiesSaga(action){
    try{
        let response = yield call(getApiCall, Api.apiToGetAmenities );
        console.log("RESPONSE", response);
        if(!response.success){
            alert(response.message);
            return;
        }else{
            yield put(setData({ 'amenitiesList' : response.message }));
        }
    }catch(err){

    }
}

function* uploadPicOnAWSSaga(action){
    try {
        let obj = action.data;
        let response = yield call(uploadOnAWSRequest, Api.apiToUploadIntoAWS, obj );
        console.log("RESPONSE", response);
        if(!response.success){
            alert(response.message);
            return;
        }else{
            alert(response.message);
        }
    } catch (e) {
        alert(JSON.stringify(e));
    }
}

const mySaga = [
    takeLatest( REGISTER_USER_INFO, registerUserInfoSaga ),
    takeLatest( SEND_OTP, sendOTPSaga),
    takeLatest( VERIFY_OTP, verifyOtpSaga),
    takeLatest( VERIFY_EMAIL, verifyEmailSaga),
    takeLatest( SET_USER_TYPE, setUserTypeSaga),
    takeLatest( GET_AREAS, getAreasList),
    takeLatest( GET_AMENITIES, getAmenitiesSaga ),
    takeLatest( UPLOAD_PHOTO_ON_AWS, uploadPicOnAWSSaga )
];

export default mySaga;