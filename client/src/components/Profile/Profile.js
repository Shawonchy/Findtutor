import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getProfileByHandle } from "../../actions/ProfileAction";
import ProfileHeader from "./ProfileHeader";
import Spinner from "../Common/Spinner";
import { getEmailTutor } from "../../actions/TutionAction";
//import TextFieldGroup from "../Common/TextFieldGroup";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      mobile: "",
      email: "",
      info: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { profile } = this.props.profile;
    const value = {
      email1: this.state.email,
      email2: profile.user.email,
      info: this.state.info
      //id:profile._id
    };
    this.props.getEmailTutor(value);
    console.log(value);
  }
  componentDidMount() {
    //this property is handle from the urls handle
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;

    //console.log(profile.handle); //profile.user.email is not acccesible
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <div className="row">
            <div className="col-md-8">
              <ProfileHeader profile={profile} />
            </div>
            <div className="col-md-4">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label for="yourname">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label for="mobile">Mobile</label>
                  <input
                    type="number"
                    className="form-control"
                    name="mobile"
                    value={this.state.mobile}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label for="Detailed info">Detailed info:</label>
                  <textarea
                    className="form-control"
                    name="info"
                    value={this.state.info}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="Send email"
                    className="btn btn-info btn-block mt-4"
                  />
                </div>
              </form>
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
Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getEmailTutor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileByHandle, getEmailTutor }
)(Profile);
