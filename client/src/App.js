import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import register from "./components/auth/register";
import login from "./components/auth/login";
import landing from "./components/layouts/landing";
import email_verify from "./components/auth/email_verify";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser } from "./actions/AuthAction";
import { SET_CURRENT_USER } from "../src/actions/types";

//check for token
if (localStorage.jwtToken) {
  //providing the auth header with token
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isauthenticated
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });

  //check for expired token
  const curretTime = Date.now() / 1000;
  if (decoded.exp < curretTime) {
    //logout user
    store.dispatch(logoutUser());
    //redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={landing} />
          <div className="container">
            <Route exact path="/register" component={register} />
            <Route exact path="/login" component={login} />
            <Route exact path="/confirmation/:token" component={email_verify} />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
