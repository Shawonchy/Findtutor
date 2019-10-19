import {
  GET_TUTIONS,
  GET_TUTION,
  TUTION_LOADING,
  GET_ERRORS,
  GET_APPLIEDTUTION
} from "./types";
import axios from "axios";

export const getTutions = () => dispatch => {
  dispatch(setTutionLoading());
  axios
    .get("/api/tution/all")
    .then(res => {
      dispatch({
        type: GET_TUTIONS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_TUTIONS,
        payload: null
      });
      console.log(err);
    });
};

export const getTutionById = id => dispatch => {
  dispatch(setTutionLoading());
  axios
    .get(`/api/tution/id/${id}`)
    .then(res => {
      dispatch({
        type: GET_TUTION,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_TUTION,
        payload: null
      });
    });
};

export const getTutionByLocation = (searchdata, history) => dispatch => {
  console.log(searchdata);
  dispatch(setTutionLoading());
  axios
    .post("/api/tution/search-tution", searchdata)
    .then(res => {
      dispatch({
        type: GET_TUTIONS,
        payload: res.data
      });
      console.log(res.data);
      history.push("/tution-search-result");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: null
      });
      console.log(err);
    });
};

//email tutor

export const getEmailTutor = value => dispatch => {
  axios
    .post("/api/email-tutor", value)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

//get all applied tutions

export const getAppliedTutions = () => dispatch => {
  dispatch(setTutionLoading());
  axios
    .get("/api/tution/applied-tution")
    .then(res => {
      dispatch({
        type: GET_APPLIEDTUTION,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => {
      dispatch({
        type: GET_APPLIEDTUTION,
        payload: null
      });
      console.log(err);
    });
};

export const setTutionLoading = () => {
  return {
    type: TUTION_LOADING
  };
};
//export const getTution = () => dispatch => {};
