import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
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
import AdminPrivateRoute from "./components/Common/AdminPrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser } from "./actions/AuthAction";
import { logoutAdmin } from "./actions/AdminActions/AuthAdminAction";

import Content from "./components/Admin/Content";

import { clearCurrentProfile } from "./actions/ProfileAction";
import { SET_CURRENT_USER, SET_CURRENT_ADMIN } from "../src/actions/types";
import AllTutions from "./components/Tutions/AllTutions";
import Tution from "./components/Tutions/Tution";
import SearchTutionResult from "./components/SearchTution/SearchTutionResult";

import AdminLogin from "./components/Admin/AdminLogin";
import { HashRouter } from "react-router-dom"; //for refreshing browser ulr issue

import RegisterAdmin from "./components/Admin/RegisterAdmin";
import AllAdmins from "./components/Admin/AllAdmins";
import AllUsers from "./components/Admin/AllUsers";
//import AllTutions from "./components/Admin/AllTutions";
import TutorAppliedForTutions from "./components/Admin/TutorAppliedForTutions";
import TutionById from "./components/Admin/TutionById";
import TutorProfiles from "./components/Admin/TutorProfiles";
import TutorProfile from "./components/Admin/TutorProfile";

import DashboardProfile from "./components/Dashboard/DashboardProfile";

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

//check for token for admin
if (sessionStorage.jwtToken) {
  //providing the auth header with token
  setAuthToken(sessionStorage.jwtToken);
  const decoded = jwt_decode(sessionStorage.jwtToken);
  //set user and isauthenticated
  store.dispatch({
    type: SET_CURRENT_ADMIN,
    payload: decoded
  });

  //check for expired token
  const curretTime = Date.now() / 1000;
  if (decoded.exp < curretTime) {
    //logout user
    store.dispatch(logoutAdmin());
    //store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = "/admin/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
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
              {/* PrivateRoute is used for if user is logged in then these route will work otherwise not */}

              <PrivateRoute exact path="/dashboard" component={Dashboard} />

              {/* <PrivateRoute
                path="/dashboard"
                component={() => {
                  return <Redirect to="/myprofile" />;
                }}
              /> */}

              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />

              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />

              {/* <Switch>
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
              </Switch> */}
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
              {/* <Route exact path="/admin/dashboard" component={Content} /> */}
              {/* <Route
                path="/admin/dashboard"
                component={Content}
                loc="http://localhost:3000/admin#/"
              /> */}
              <AdminPrivateRoute
                exact
                path="/admin/dashboard"
                component={Content}
              />

              <AdminPrivateRoute
                exact
                path="/admin/create-admin"
                component={RegisterAdmin}
              />

              <AdminPrivateRoute
                exact
                path="/admin/all-admins"
                component={AllAdmins}
              />

              <AdminPrivateRoute
                exact
                path="/admin/all-users"
                component={AllUsers}
              />

              <AdminPrivateRoute
                exact
                path="/admin/all-tutions"
                component={AllTutions}
              />

              <AdminPrivateRoute
                exact
                path="/admin/applied-tutions"
                component={TutorAppliedForTutions}
              />

              {/* <AdminPrivateRoute exact path="/" component={Content} /> */}

              <AdminPrivateRoute
                exact
                path="/admin/get-tution-id/:id"
                component={TutionById}
              />

              <AdminPrivateRoute
                exact
                path="/admin/tutor-profiles"
                component={TutorProfiles}
              />

              <AdminPrivateRoute
                exact
                path="/admin/tutor-profile/:handle"
                component={TutorProfile}
              />
            </div>
          </Switch>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
