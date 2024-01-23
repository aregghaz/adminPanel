import { combineReducers } from "redux";
import authReducer from "./auth";
import adminVendorUsersReducer from "./vendorUsers";
import tabsReducer from "./tab";



const reducers = combineReducers({
    authReducer,
    adminVendorUsersReducer,
    tabsReducer,
});
export type ReducerType = typeof reducers

export default reducers;

