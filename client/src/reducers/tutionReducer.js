import {
  GET_TUTIONS,
  GET_TUTION,
  TUTION_LOADING,
  GET_APPLIEDTUTION
} from "../actions/types";
const initialState = {
  tutions: null,
  tution: null,
  loading: false,
  appliedtutions: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TUTION:
      return {
        ...state,
        tution: action.payload,
        loading: false
      };
    case TUTION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TUTIONS:
      return {
        ...state,
        tutions: action.payload,
        loading: false
      };
    case GET_APPLIEDTUTION:
      return {
        ...state,
        appliedtutions: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
