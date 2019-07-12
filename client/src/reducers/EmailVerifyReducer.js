import { EMAIL_VERIFICATION } from "../actions/types";
import isEmpty from "../validation/isEmpty";
const initialState = {
  isVerified: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EMAIL_VERIFICATION:
      return {
        ...state,
        isVerified: !isEmpty(action.payload)
      };
    default:
      return state;
  }
}
