import {
    TEST_SAGA,
    REGISTER_USER_INFO,
    UPDATE_DATA,
    SEND_OTP,
    VERIFY_OTP,
    VERIFY_EMAIL,
    SET_USER_TYPE,
    GET_AREAS,
    GET_AMENITIES
} from "./constants";

export const testAction = payload => {
    return {
        type : TEST_SAGA,
        payload
    }
}

export const setData = data => {
    return {
        type : UPDATE_DATA,
        data
    }
}

export const registerUser = userData => {
    return {
        type : REGISTER_USER_INFO,
        userData
    }
}

export const sendOTP = phoneNumber => {
    return {
        type : SEND_OTP,
        phoneNumber
    }
}

export const verifyOTP = (phoneNumber, otp) => {
    return {
        type : VERIFY_OTP,
        phoneNumber,
        otp
    }
}

export const verifyEmail = (email, password) => {
    return {
        type : VERIFY_EMAIL,
        email,
        password
    }
}

export const setUserType = userType => {
    return {
        type : SET_USER_TYPE,
        userType
    }
}

export const getAreas = () => {
    return {
        type : GET_AREAS
    }
}

export const getAmenities = () => {
    return {
        type : GET_AMENITIES
    }
}