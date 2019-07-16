import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";
import axios from "axios";

//get current current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    //if there is no profile retured then payload will be an empty object
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};
//posting to profile api
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => {
      console.log(res.data);
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//deleting a profile and user
export const deleteProfile = () => dispatch => {
  axios
    .delete("/api/profile")
    .then(res => {
      dispatch({
        //loging out the user after deleting profile by sending payload as {}
        type: SET_CURRENT_USER,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.res
      });
    });
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
