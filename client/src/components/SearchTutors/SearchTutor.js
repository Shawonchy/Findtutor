import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import SelectListGroup from "../Common/SelectListGroup";
import { getsearchTutorProfile } from "../../actions/ProfileAction";

class SearchTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      gender: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const searchData = {
      location: this.state.location,
      gender: this.state.gender
    };
    this.props.getsearchTutorProfile(searchData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    // Select options for status
    const options = [
      { label: "* Select location", value: 0 },
      { label: "Sylhet", value: "Sylhet" },
      { label: "Dhaka", value: "Dhaka" },
      { label: "Chittagong", value: "Chittagong" },
      { label: "Khulna", value: "Khulna" }
    ];
    const options2 = [
      { label: "* Select gender", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1 className="display-4 text-center">Search Tutor</h1>
              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  options={options}
                  error={errors.location}
                  info="Give us an idea of where you are searching a tutors"
                />
                <SelectListGroup
                  placeholder="gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  options={options2}
                  error={errors.gender}
                  info="Give us an idea of gender for searching a tutors"
                />
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SearchTutor.propTypes = {
  getsearchTutorProfile: PropTypes.func.isRequired
};
export default connect(
  null,
  { getsearchTutorProfile }
)(withRouter(SearchTutor));
