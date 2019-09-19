import { 
    TEST_SAGA,
    UPDATE_DATA
} from "./constants";

let reducer = {
    test : {},
    userInfo : {},
    areaList : [
        { name : "Boring Road", id: "boringRoad" },
        { name : "Beijing Road", id: "beijingroad" },
        { name : "Danapur", id: "danapur" },
        { name : "Gandhi maidan", id: "gandhiMaidan" },
        { name : "Aise hi kuch v", id: "aisehikuchv" }
      ]
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