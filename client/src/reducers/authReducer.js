import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      //localStorage.setItem("authaction", "SET_CURRENT_USER");
      console.log(action.payload);
      return {
        //returing current state
        ...state,
        //if payload is not empty then user is authenticated
        isAuthenticated: !isEmpty(action.payload),
        //action== this sent from auth action
        user: action.payload
      };

    default:
      return state;
  }
}
