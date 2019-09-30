import {
    TEST_SAGA,
    REGISTER_USER_INFO,
    UPDATE_DATA,
    SEND_OTP,
    VERIFY_OTP,
    VERIFY_EMAIL,
    SET_USER_TYPE,
    GET_AREAS,
    GET_AMENITIES,
    UPLOAD_PHOTO_ON_AWS,
    SAVE_APARTMENT,
    GET_APARTMENTS,
    GET_APARTMENT_DATA,
    SAVE_ROOM,
    GET_ROOM_DETAILS,
    DELETE_APARTMENT,
    UPDATE_APARTMENT,
    UPDATE_ROOM
} from "./constants";

export const updateRoom = room => {
    return {
        type : UPDATE_ROOM,
        room
    }
}

export const updateApartment = apartment => {
    return {
        type : UPDATE_APARTMENT,
        apartment
    }
}

export const deleteApartment = () => {
    return {
        type : DELETE_APARTMENT
    }
}

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

export const sendOTP = (phoneNumber = "") => {
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

export const uploadOnAws = data => {
    return {
        type : UPLOAD_PHOTO_ON_AWS,
        data
    }
}

export const saveApartment = apartment => {
    return {
        type : SAVE_APARTMENT,
        apartment
    }
}

export const getApartments = () => {
    return {
        type : GET_APARTMENTS
    }
}

export const getApartment = apartmentId => {
    return {
        type : GET_APARTMENT_DATA,
        apartmentId
    }
}

export const saveRoom = room => {
    return {
        type : SAVE_ROOM,
        room
    }
}

export const getRoomDetails = roomId => {
    return {
        type : GET_ROOM_DETAILS,
        roomId
    }
}