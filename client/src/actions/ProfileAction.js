import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";
import axios from "axios";

//get current current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading()); //for loading (spinner)
  axios
    .get("http://localhost:5000/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      console.log(res.data);
    })
    //if there is no profile retured then payload will be an empty object
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
      console.log("something wrong");
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
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      console.log(err.response.data);
    });
};
//add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//add TutionInfo
export const addTutionInfo = (tutionInfoData, history) => dispatch => {
  axios
    .post("/api/profile/tution-info", tutionInfoData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      console.log(err);
    });
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
//get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
    });
};
//get Profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading()); //for loading (spinner)
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
    });
};

// upload image
export const uploadimage = value => dispatch => {
  axios
    .post("/api/profile/uploadpicture", value)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
//serach tutors
export const getsearchTutorProfile = (searchData, history) => dispatch => {
  dispatch(setProfileLoading()); //for loading (spinner)
  axios
    .post("/api/profile/searchprofile", searchData)
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
      console.log(res.data);
      history.push("/search-result");
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: null
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
