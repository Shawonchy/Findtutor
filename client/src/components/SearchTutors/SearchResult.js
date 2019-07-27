import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import { getProfiles } from "../../actions/ProfileAction";
import ProfileItems from "../Profiles/ProfileItems";
import Spinner from "../Common/Spinner";
class SearchResult extends Component {
  render() {
    const { profiles, loading } = this.props.profile;
    //console.log(typeof profiles);
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      console.log(profiles.length);
      console.log(typeof profiles);
      console.log(profiles);
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          //profile property is sent to ProfileItems component
          <ProfileItems key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found</h4>;
      }
    }
    return (
      <div>
        <div className="profiles">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Tutors Profiles</h1>
                <p className="lead text-center">
                  Browse and connect with Tutors
                </p>
                {profileItems}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SearchResult.propTypes = {
  //getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(SearchResult);
