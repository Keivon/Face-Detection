import { combineReducers } from "redux";
import Reducer from "./reducer";
const rootReducer = combineReducers({
    output: Reducer,
});
export default rootReducer;