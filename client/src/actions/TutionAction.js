import { GET_TUTIONS, GET_TUTION, TUTION_LOADING } from "./types";
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

export const setTutionLoading = () => {
  return {
    type: TUTION_LOADING
  };
};
export const getTution = () => dispatch => {};