import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteProfile } from "../../actions/ProfileAction";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";
import ProfileActionsButton from "./ProfileActionsButton";
import Education from "./Education";
import Dashboardlayout from "./html/Myprofile";
import DashboardProfile from "./DashboardProfile";
import Sidebar from "./Sidebar";
import Uploadphoto from "./Uploadphoto";
import MyApplications from "./MyApplications";
import MyCurrentTutions from "./MyCurrentTutions";
import AddTutionInfo from "../add-credential/AddTutuionInfo";
import AddEducation from "../add-credential/AddEducation";
import { getTutions } from "../../actions/TutionAction";
import TutionCarousel from "../Tutions/TutionCarousel";
import Tution from "../Tutions/Tution";

class dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getTutions();
  }
  onDeleteClick(e) {
    this.props.deleteProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { tutions } = this.props.tution;
    let dashboardcontent;
    if (profile === null || loading) {
      dashboardcontent = <Spinner />;
    } else {
      //check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardcontent = (
          // <div>
          //   <p className="lead text-muted">
          //     Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          //   </p>
          //   <ProfileActionsButton />
          //   {/* passing education data to education Component  */}
          //   <Education education={profile.education} />
          //   <div style={{ marginBottom: "60px" }} />
          //   <button
          //     onClick={this.onDeleteClick.bind(this)}
          //     className="btn btn-danger"
          //   >
          //     Delete My Account
          //   </button>
          // </div>

          //<Dashboardlayout />
          <Router>
            <div className="profilelayout">
              <div className="container">
                <div className="row">
                  <div className="col-md-7">
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardProfile}
                    />
                    <Route
                      exact
                      path="/tution-info"
                      component={AddTutionInfo}
                    />
                    <Route
                      exact
                      path="/myprofile"
                      component={DashboardProfile}
                    />
                    <Route exact path="/uploadphoto" component={Uploadphoto} />
                    <Route
                      exact
                      path="/myapplications"
                      component={MyApplications}
                    />
                    <Route
                      exact
                      path="/mycurrent-tution"
                      component={MyCurrentTutions}
                    />

                    <Route
                      exact
                      path="/add-education"
                      component={AddEducation}
                    />
                    <Route exact path="/tution/:id" component={Tution} />
                  </div>
                  <div className="col">
                    <div className="row mb-3 ml-3">
                      <Sidebar />
                    </div>
                    <div className="row">
                      <div className="col">
                        <TutionCarousel tutions={tutions} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Router>
        );
      } else {
        //user logged in but has no profile
        dashboardcontent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return <div className="dashboard">{dashboardcontent}</div>;
  }
}

dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getTutions: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  tution: state.tution
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteProfile, getTutions }
)(dashboard);
