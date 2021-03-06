import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import errorReducer from "./errorReducer";
import EmailVerifyReducer from "./EmailVerifyReducer";
import ProfileReducer from "./ProfileReducer";
import tutionReducer from "./tutionReducer";
import AdminReducer from "./AdminReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  verify: EmailVerifyReducer,
  profile: ProfileReducer,
  tution: tutionReducer,
  admin: AdminReducer
});
