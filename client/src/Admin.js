import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Content from "../src/components/Admin/Content";
import Sidebar from "./components/Admin/Sidebar";
import Navbar from "./components/Admin/Navbar";
import RegisterAdmin from "./components/Admin/RegisterAdmin";
import AllAdmins from "./components/Admin/AllAdmins";
import AllUsers from "./components/Admin/AllUsers";
import AllTutions from "./components/Admin/AllTutions";
import TutorAppliedForTutions from "./components/Admin/TutorAppliedForTutions";
import TutionById from "./components/Admin/TutionById";
function Admin() {
  return (
    <Provider store={store}>
      <Router>
        <div className="Admin">
          <Sidebar />

          {/* Content Wrapper */}
          {/* <div id="content-wrapper" className="d-flex flex-column"> */}
          {/* Main Content */}
          {/* <div id="content">
                <Navbar />
                
                
              </div> */}
          {/* </div> */}
        </div>
        <Route exact path="/admin/create-admin" component={RegisterAdmin} />
        <Route exact path="/admin/all-admins" component={AllAdmins} />
        <Route exact path="/admin/all-users" component={AllUsers} />
        <Route exact path="/admin/all-tutions" component={AllTutions} />
        <Route
          exact
          path="/admin/applied-tutions"
          component={TutorAppliedForTutions}
        />
        <Route exact path="/admin" component={Content} />
        <Route exact path="/admin/get-tution-id/:id" component={TutionById} />
      </Router>
    </Provider>
  );
}
export default Admin;
