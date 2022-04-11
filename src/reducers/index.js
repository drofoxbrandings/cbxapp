import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserReducer from "./UserReducer";
import ShipmentReducer from "./ShipmentReducer";

export default combineReducers({
  AuthReducer,
  UserReducer,
  ShipmentReducer
});