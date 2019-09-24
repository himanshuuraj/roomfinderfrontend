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

    // carousel
    carouselData : {
        show : false,
        imageList : []
    }
};

export default (state = reducer, action) => {
    switch (action.type) {
        case TEST_SAGA:
            return Object.assign({}, state, { test: action.payload });
        case UPDATE_DATA:
            return { ...state, ...action.data };
        default:
            return state;
    }
};