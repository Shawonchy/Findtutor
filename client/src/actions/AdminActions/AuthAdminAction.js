import { SET_CURRENT_ADMIN, GET_ERRORS } from "../types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//register user
// export const registerUser = (userData, history) => dispatch => {
//   axios
//     .post("/api/users/register", userData)
//     .then(res => history.push("/login"))
//     //history.push("/login")) //if register complete redirect to login page)
//     .catch(err => {
//       dispatch({
//         //dispatching(sending) to error reducer
//         type: GET_ERRORS,
//         payload: err.response.data
//       });
//     });
// };
//current user info
// export const getCurrentUserInfo = () => dispatch => {
//   axios
//     .get("/api/users/register/current-user-info")
//     .then(res => {
//       dispatch({
//         type: GET_CURRENTUSERINFO,
//         paylaod: res.data
//       });
//     })
//     .catch(err => console.log(err));
// };

export const setCurrentAdmin = decoded => {
  console.log(decoded);
  return {
    type: SET_CURRENT_ADMIN,
    paylaod: decoded
  };
};

//login user action
export const loginAdmin = adminData => dispatch => {
  axios
    .post("http://localhost:5000/api/admin/login", adminData)
    .then(res => {
      const token = res.data.token;
      localStorage.setItem("jwtToken", token); //set token to local storage
      setAuthToken(token); //set token to auth header
      const decoded = jwt_decode(token); //decodeing the token
      dispatch({
        //dispatching(sending) to error reducer
        type: SET_CURRENT_ADMIN,
        payload: decoded
      }); //set and dispatch current user to reducer
      console.log(decoded);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data //dispatching(sending) to error reducer
      })
    );
};
