import {
  GET_ADMINS,
  GET_USERS,
  GET_ERRORS,
  USER_LOADING,
  ADMIN_LOADING,
  GET_TUTIONS,
  TUTION_LOADING
} from "../types";

import axios from "axios";
import { setTutionLoading } from "../TutionAction";

export const get_admins = () => dispatch => {
  dispatch(setAdminLoading());

  axios
    .get("http://localhost:5000/api/admin/get_allAdmins")
    .then(res => {
      dispatch({
        type: GET_ADMINS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ADMINS,
        payload: null
      });
    });
};

export const get_users = () => dispatch => {
  dispatch(setUserLoading);
  axios
    .get("http://localhost:5000/api/admin/get_allUsers")
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USERS,
        payload: null
      });
    });
};

// export const get_tutions=()=>dispatch=>{
// dispatch(setTutionLoading)
// }


export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const setAdminLoading = () => {
  return {
    type: ADMIN_LOADING
  };
};
