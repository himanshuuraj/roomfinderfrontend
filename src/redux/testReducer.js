import { cloneDeep } from "lodash";
import { 
    TEST_SAGA,
    UPDATE_DATA
} from "./constants";

let reducer = {
    test : {},
    userInfo : {},
    areaList : [],
    amenitiesList : [],

    //owner
    selectedApartment : {},
    allApartments : [],
    addType : "",
    selectedRoom : {},

    // errorModal
    errorModalInfo : {
        showModal : false,
        title : "",
        message : "",
        buttonText : "",
        onClose : ""
    },

    // confirmModal
    confirmModalInfo : {
        showModal : false,
        title : "",
        message : "",
        primaryText : "",
        primaryAction : "",
        secondaryText : "",
        secondaryAction : ""
    },

    // carousel
    carouselData : {
        show : false,
        imageList : []
    },

    // loading
    loading : {
        show : false
    },

    // rental
    apartmentList : [],

    showPickArea : false

};

export default (state = reducer, action) => {
    switch (action.type) {
        case TEST_SAGA:
            return Object.assign({}, state, { test: action.payload });
        case UPDATE_DATA:
            let obj = cloneDeep(state);
            return Object.assign({}, obj, { ...action.data });
        default:
            return state;
    }
};