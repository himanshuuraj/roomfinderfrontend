import { 
    TEST_SAGA,
    UPDATE_DATA
} from "./constants";

let reducer = {
    test : {},
    userInfo : {},
    areaList : [],
    amenitiesList : [],
    addApartmentData : {}
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