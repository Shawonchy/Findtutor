import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import register from "./components/auth/register";
import login from "./components/auth/login";
import landing from "./components/layouts/landing";
import email_verify from "./components/auth/email_verify";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProfile from "./components/CreateProfile/CreateProfile";
import EditProfile from "./components/EditProfile/EditProfile";
import AddEducation from "./components/add-credential/AddEducation";
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/Profile/Profile";
import SearchTutor from "./components/SearchTutors/SearchTutor";
import SearchResult from "./components/SearchTutors/SearchResult";
import RequestTution from "./components/RequestTution/RequestTution";
import AddTutionInfo from "./components/add-credential/AddTutuionInfo";
import SearchTution from "./components/SearchTution/SearchTutionResult";
import PaymentSuccess from "./components/PaymentSuccess";
import Footer from "./components/layouts/footer";
import store from "./store";
import PrivateRoute from "./components/Common/Privateroute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser } from "./actions/AuthAction";

import Content from "./components/Admin/Content";

import { clearCurrentProfile } from "./actions/ProfileAction";
import { SET_CURRENT_USER } from "../src/actions/types";
import AllTutions from "./components/Tutions/AllTutions";
import Tution from "./components/Tutions/Tution";
import SearchTutionResult from "./components/SearchTution/SearchTutionResult";

import AdminLogin from "./components/Admin/AdminLogin";
import { HashRouter } from "react-router-dom"; //for refreshing browser ulr issue

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
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <HashRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={landing} />
            <div className="container">
              <Route exact path="/register" component={register} />
              <Route exact path="/login" component={login} />
              <Route
                exact
                path="/confirmation/:token"
                component={email_verify}
              />
              {/* // switch is used to prevent redirect issues */}
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/tution-info"
                  component={AddTutionInfo}
                />
              </Switch>
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/search-tutors" component={SearchTutor} />
              <Route exact path="/search-result" component={SearchResult} />
              <Route exact path="/ask_for_a_tutor" component={RequestTution} />
              <Route exact path="/all_tutions" component={AllTutions} />
              <Route exact path="/tution/:id" component={Tution} />
              <Route exact path="/payment-success" component={PaymentSuccess} />
              <Route
                exact
                path="/tution-search-result"
                component={SearchTutionResult}
              />
              <Route exact path="/admin/login" component={AdminLogin} />
            </div>

            <Footer />
          </div>
        </HashRouter>
      </Router>
    </Provider>
  );
}

export default App;
