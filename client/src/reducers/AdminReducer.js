import {
  GET_ADMINS,
  GET_USERS,
  USER_LOADING,
  ADMIN_LOADING,
  SET_CURRENT_ADMIN, GET_ERRORS
} from "../actions/types";
import isEmpty from "../validation/isEmpty";

const initialState = {
  admins: null,
  users: null,
  loading: false,
  isAuthenticated:false,
  errors:{},
  admin:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };

    case ADMIN_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_ADMINS:
      return {
        ...state,
        admins: action.payload,
        loading: false
      };
    case SET_CURRENT_ADMIN:
      return {
        ...state,
        isAuthenticated:!isEmpty(action.payload),
        admin:action.payload

    }
    case GET_ERRORS:
      return{
        ...state,
        errors:action.payload
      }

    default:
      return state;
  }
}
