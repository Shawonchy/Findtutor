import { GET_ERRORS, SET_CURRENT_USER, EMAIL_VERIFICATION } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    //history.push("/login")) //if register complete redirect to login page)
    .catch(err => {
      dispatch({
        //dispatching(sending) to error reducer
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  console.log(decoded);
  return {
    type: SET_CURRENT_USER,
    paylaod: decoded
  };
};

//login user action
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const token = res.data.token;
      localStorage.setItem("jwtToken", token); //set token to local storage
      setAuthToken(token); //set token to auth header
      const decoded = jwt_decode(token); //decodeing the token
      dispatch({
        //dispatching(sending) to error reducer
        type: SET_CURRENT_USER,
        payload: decoded
      }); //set and dispatch current user to reducer
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data //dispatching(sending) to error reducer
      })
    );
};

//logout user

export const logoutUser = () => dispatch => {
  //removing token from local storage
  localStorage.removeItem("jwtToken");
  //removing token from auth header
  setAuthToken(false);
  //dispatching the as empty object which will set isauthenticated as false
  //dispatch(setCurrentUser({}));
  dispatch({
    type: SET_CURRENT_USER,
    payload: ""
  });
};

//email verification
export const emailVerification = () => dispatch => {
  axios
    .get("/api/users/confirmation/:token")
    .then(
      dispatch({
        type: EMAIL_VERIFICATION
      })
    )
    .catch();
};
