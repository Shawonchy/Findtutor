import axios from "axios";
const setAuthToken = token => {
  if (token) {
    //setting token to auth headers
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //deleting auth headers
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
