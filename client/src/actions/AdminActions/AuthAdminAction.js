import { SET_CURRENT_ADMIN, GET_ERRORS } from "../types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { Route, Redirect } from "react-router-dom";

export const setCurrentAdmin = decoded => {
  console.log(decoded);
  return {
    type: SET_CURRENT_ADMIN,
    paylaod: decoded
  };
};

//login admin action
export const loginAdmin = adminData => dispatch => {
  axios
    .post("/api/admin/login", adminData)
    .then(res => {
      const token = res.data.token;
      console.log(token);
      //localStorage.setItem("jwtToken", token); //set token to local storage

      sessionStorage.setItem("jwtToken", token);
      setAuthToken(token); //set token to auth header
      const decoded = jwt_decode(token); //decodeing the token
      dispatch({
        //dispatching(sending) to error reducer
        type: SET_CURRENT_ADMIN,
        payload: decoded
      }); //set and dispatch current user to reducer
      console.log("admin logged in");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data //dispatching(sending) to error reducer
      })
    );
};

//logout admin

export const logoutAdmin = history => dispatch => {
  //removing token from local storage
  sessionStorage.removeItem("jwtToken");
  //removing token from auth header
  setAuthToken(false);
  //dispatching the as empty object which will set isauthenticated as false
  //dispatch(setCurrentUser({}));
  dispatch({
    type: SET_CURRENT_ADMIN,
    payload: ""
  });
  // return <Redirect exact to="/admin/login" />;
  history.push("/admin/login");
};
