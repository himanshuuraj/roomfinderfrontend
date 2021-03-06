import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { REGISTER_USER_INFO, SEND_OTP, VERIFY_OTP, VERIFY_EMAIL, SET_USER_TYPE, GET_AREAS, GET_AMENITIES, 
    UPLOAD_PHOTO_ON_AWS, SAVE_APARTMENT, GET_APARTMENTS, GET_APARTMENT_DATA, SAVE_ROOM, GET_ROOM_DETAILS, DELETE_APARTMENT, UPDATE_DATA, 
    UPDATE_APARTMENT, UPDATE_ROOM, DELETE_ROOM, GET_SEARCHED_APARTMENTS } from "./../redux/constants";
import { getApiCall, postApiCall, putApiCall, uploadOnAWSRequest, deleteApiCall } from "./../global/request";
import * as Api from "./../global/api";
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { setData, getApartment } from "./../redux/action";
import { UserType } from '../global/util';

function* registerUserInfoSaga(action){
    try {
        let obj = action.userData;
        yield put(setData({ loading : { show : true }}));
        let response = yield call(postApiCall, Api.apiToRegister, obj );
        yield put(setData({ loading : { show : false }}));
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }
        let userInfo = response.message;
        yield put(setData({ 'userInfo' : userInfo }));
        yield call(AsyncStorage.setItem, 'userInfo', JSON.stringify(userInfo));
        Actions.verifyMobileNumber();
    } catch (e) {
        yield put(setData({ errorModalInfo : {
            showModal : true,
            message : JSON.stringify(e)
          }
        }));
    }
}

function* sendOTPSaga(action){
    try {
        let state = yield select();
        userInfo = state.testReducer.userInfo;
        let url = Api.apiToSendOTP + (userInfo.phoneNumber || action.phoneNumber);
        let response = yield call(getApiCall, url );
        console.log("RESPONSE", response);
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            Actions.registerationPage();
        }
    } catch (e) {
        yield put(setData({ errorModalInfo : {
            showModal : true,
            message : JSON.stringify(e)
          }
        }));
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
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }
        let userInfo = response.message;
        yield put(setData({ 'userInfo' : userInfo }));
        yield call(AsyncStorage.setItem, 'userInfo', JSON.stringify(userInfo));
        if(userInfo.userType == UserType.OWNER)
            Actions.ownerPage();
        else if(userInfo.userType == UserType.RENTAL)
            Actions.searchPage();
        else
            Actions.optionsPage();
    }catch(err){
        yield put(setData({ errorModalInfo : {
            showModal : true,
            message : JSON.stringify(e)
          }
        }));
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
        if(response.success){
            yield call(AsyncStorage.setItem, 'userInfo', JSON.stringify(response));
            Actions.homeDetails();
        }else{
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            Actions.registerationPage();
            return;
        }
    }catch(err){
        yield put(setData({ errorModalInfo : {
            showModal : true,
            message : JSON.stringify(e)
          }
        }));
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
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }else{
            let userInfo = response.message;
            yield call(AsyncStorage.setItem, 'userInfo', JSON.stringify(userInfo));
            if(userInfo.mobileNumberVerified && userInfo.userType){
                if(userInfo.userType == UserType.OWNER)
                    Actions.ownerPage();
                else
                    Actions.searchPage();
            }
        }
    }catch(err){

    }
}

function* getAreasListSaga(action){
    try{
        console.log("hhhhhh");
        let response = yield call(getApiCall, Api.apiToGetAreaList );
        console.log("RESPONSE", response);
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
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
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
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
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }else{
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
        }
    } catch (e) {
        yield put(setData({ errorModalInfo : {
            showModal : true,
            message : JSON.stringify(e)
          }
        }));
    }
}

function* saveApartmentSaga(action){
    try{
        let state = yield select();
        userInfo = state.testReducer.userInfo;
        let url = Api.apiToSaveApartment + userInfo.userId;
        let response = yield call(postApiCall, url, action.apartment );
        console.log("RESPONSE", response);
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }else{
            yield put(setData({ 'selectedApartment' : response.message }));
            Actions.ownerPage();
        }
    }catch(e){
        yield put(setData({ errorModalInfo : {
            showModal : true,
            message : JSON.stringify(e)
          }
        }));
    }
}

function* getApartmentsSaga(action){
    try{
        let state = yield select();
        userInfo = state.testReducer.userInfo;
        let url = Api.apiToGetApartments + userInfo.userId;
        let response = yield call(getApiCall, url );
        console.log("RESPONSE", response);
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }else{
            yield put(setData({ 'allApartments' : response.message }));
        }
    }catch(e){
        yield put(setData({ errorModalInfo : {
            showModal : true,
            message : JSON.stringify(e)
          }
        }));
    }
}

function* getApartmentDataSaga(action){
    try{
        let url = Api.apiToGetApartmentData + action.apartmentId;
        let response = yield call(getApiCall, url );
        console.log("RESPONSE", response);
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }else{
            yield put(setData({ 'selectedApartment' : response.message }));
            Actions.appartmentDetails({ imageList : response.message.imageList });
        }
    }catch(e){
        yield put(setData({ errorModalInfo : {
            showModal : true,
            message : JSON.stringify(e)
          }
        }));
    }
}

function* saveRoomSaga(action){
    try{
        let state = yield select();
        selectedApartment = state.testReducer.selectedApartment;
        let apartmentId = selectedApartment.apartmentId;
        let url = Api.apiToSaveRoom + apartmentId;
        let response = yield call(postApiCall, url, action.room );
        console.log("RESPONSE", response);
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }else{
            yield put(getApartment(apartmentId));
            // Actions.appartmentDetails();
        }
    }catch(e){
        yield put(setData({ errorModalInfo : {
            showModal : true,
            message : JSON.stringify(e)
          }
        }));
    }
}

function* getRoomDataSaga(action){
    try{
        let url = Api.apiToGetApartmentData + action.apartmentId;
        let response = yield call(getApiCall, url );
        console.log("RESPONSE", response);
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }else{
            Actions.appartmentDetails();
            yield put(setData({ 'selectedApartment' : response.message }));
        }
    }catch(e){
        yield put(setData({ errorModalInfo : {
            showModal : true,
            message : JSON.stringify(e)
          }
        }));
    }
}

function* deleteApartmentSaga(action){
    try{
        let state = yield select();
        let apartmentId = state.testReducer.selectedApartment.apartmentId;
        let userId = state.testReducer.userInfo.userId;
        let url = Api.apiToDeleteApartment + userId + "/" + apartmentId;
        let response = yield call(deleteApiCall, url );
        console.log("RESPONSE", response);
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : false,
                message : response.message
              },
              confirmModalInfo : {
                showModal : false
              }
            }));
            return;
        }else{
            Actions.ownerPage();
        }
    }catch(e){
        yield put(setData({ errorModalInfo : {
            showModal : true,
            message : JSON.stringify(e)
          }
        }));
    }
}

function* updateApartmentSaga(action){
    try{
        let state = yield select();
        let apartmentId = state.testReducer.selectedApartment.apartmentId;
        let url = Api.apiToUpdateApartment + apartmentId;
        let response = yield call(putApiCall, url, action.apartment );
        console.log("RESPONSE", response);
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }else{
            Actions.ownerPage();
        }
    }catch(err){

    }
}

function* updateRoomSaga(action){
    try{
        let state = yield select();
        let roomId = state.testReducer.selectedRoom.roomId;
        let url = Api.apiToUpdateRoom + roomId;
        let response = yield call(putApiCall, url, action.room );
        console.log("RESPONSE", response);
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }else{
            Actions.pop();
            let selectedApartment = state.testReducer.selectedApartment;
            let roomlist = selectedApartment.roomlist;
            let roomIndex = roomlist.findIndex(item => item.roomId == response.message.roomId);
            roomlist[roomIndex] = response.message;
            yield put(setData({ selectedRoom : response.message, selectedApartment : selectedApartment }));
        }
    }catch(err){

    }
}

function* deleteRoomSaga(action){
    try{
        let state = yield select();
        let roomId = state.testReducer.selectedRoom.roomId;
        let apartmentId = state.testReducer.selectedApartment.apartmentId;
        let url = Api.apiToDeleteRoom + apartmentId + "/" + roomId;
        let response = yield call(deleteApiCall, url );
        console.log("RESPONSE", response);
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }else{
            Actions.appartmentDetails();
        }
    }catch(err){

    }
}

function* getSearchedApartmentsSaga(action){
    try{
        let state = yield select();
        userInfo = state.testReducer.userInfo;
        let url = Api.apiToGetSearchedApartments + action.searchText;
        let response = yield call(getApiCall, url );
        console.log(response, "Response");
        if(!response.success){
            yield put(setData({ errorModalInfo : {
                showModal : true,
                message : response.message
              }
            }));
            return;
        }else{
            yield put(setData({ 'apartmentList' : response.message }));
        }
    }catch(e){
        yield put(setData({ errorModalInfo : {
            showModal : true,
            message : JSON.stringify(e)
          }
        }));
    }
}

const mySaga = [
    takeLatest( REGISTER_USER_INFO, registerUserInfoSaga ),
    takeLatest( SEND_OTP, sendOTPSaga),
    takeLatest( VERIFY_OTP, verifyOtpSaga),
    takeLatest( VERIFY_EMAIL, verifyEmailSaga),
    takeLatest( SET_USER_TYPE, setUserTypeSaga),
    takeLatest( GET_AREAS, getAreasListSaga),
    takeLatest( GET_AMENITIES, getAmenitiesSaga ),
    takeLatest( UPLOAD_PHOTO_ON_AWS, uploadPicOnAWSSaga ),
    takeLatest( SAVE_APARTMENT, saveApartmentSaga ),
    takeLatest( GET_APARTMENTS, getApartmentsSaga ),
    takeLatest( GET_APARTMENT_DATA, getApartmentDataSaga ),
    takeLatest( SAVE_ROOM, saveRoomSaga ),
    takeLatest( GET_ROOM_DETAILS, getRoomDataSaga ),
    takeLatest( DELETE_APARTMENT, deleteApartmentSaga ),
    takeLatest( UPDATE_APARTMENT, updateApartmentSaga ),
    takeLatest( UPDATE_ROOM, updateRoomSaga ),
    takeLatest( DELETE_ROOM, deleteRoomSaga ),
    takeLatest( GET_SEARCHED_APARTMENTS, getSearchedApartmentsSaga )
];

export default mySaga;