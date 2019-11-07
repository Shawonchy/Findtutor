import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getProfileByHandle } from "../../actions/ProfileAction";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import Spinner from "../Common/Spinner";

//import TextFieldGroup from "../Common/TextFieldGroup";

class TutorProfile extends Component {
  componentDidMount() {
    //this property is handle from the urls handle
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    console.log(profile);
    //console.log(profile.handle); //profile.user.email is not acccesible
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-8">
              <ProfileHeader profile={profile} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
TutorProfile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(TutorProfile);
