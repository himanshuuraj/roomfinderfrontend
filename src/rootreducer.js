import testReducer from "./../src/redux/testReducer";
import { Actions } from "react-native-router-flux";
import { combineReducers } from "redux";

let navReducer = {
    currentScene : Actions.currentScene,
    prevScene : Actions.prevScene,
    action : Actions
};

let navigationReducer = (state = navReducer, action) => {
    // switch (action.type) {
    //     default:
    //         return state;
    // }
    let obj = Actions.ActionConst
    for(let key in obj){
        if(action.type == key)
            return { ...state, currentScene : Actions.currentScene, prevScene : Actions.prevScene}
    }
    return state;
};

const rootReducer = combineReducers({
    nav: navigationReducer,
    testReducer
});

export default rootReducer;
