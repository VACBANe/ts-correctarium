import { combineReducers } from "redux";
import onChangeReducer from "./onChangeReducer";
import buttonReducer from "./buttonReducer";

export const rootReducer = combineReducers({
  change: onChangeReducer,
  button: buttonReducer,
});
