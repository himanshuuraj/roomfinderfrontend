import { Dimensions } from "react-native";
const {height, width} = Dimensions.get('window');

export const screenWidth = width;

export const screenHeight = height;

export const TEST_SAGA = "Test_Saga";

export const REGISTER_USER_INFO = "REGISTER_USER_INFO";

export const UPDATE_DATA = "UPDATE_DATA";

export const SEND_OTP = "SEND_OTP";

export const VERIFY_OTP = "VERIFY_OTP";

export const VERIFY_EMAIL = "VERIFY_EMAIL";

export const SET_USER_TYPE = "SET_USER_TYPE";

export const GET_AREAS = "GET_AREAS";

export const GET_AMENITIES = "GET_AMENITIES";

export const UPLOAD_PHOTO_ON_AWS = "UPLOAD_PHOTO_ON_AWS";

export const SAVE_APARTMENT = "SAVE_APARTMENT";

export const GET_APARTMENTS = "GET_APARTMENTS";

export const GET_APARTMENT_DATA = "GET_APARTMENT_DATA";

export const SAVE_ROOM = "SAVE_ROOM";

export const GET_ROOM_DETAILS = "GET_ROOM_DETAILS";