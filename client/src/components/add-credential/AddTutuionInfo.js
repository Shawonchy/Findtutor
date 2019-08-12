import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
//import TextAreaFieldGroup from "../Common/TextAreaFieldGroup";
//import TextFieldGroup from "../Common/TextFieldGroup";
import SelectListGroup from "../Common/SelectListGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTutionInfo } from "../../actions/ProfileAction";

class AddTutionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expected_min_salary: "",
      current_Status_for_Tuition: "",
      days_per_week: "",
      preferred_class: "",
      preffered_subject: "",
      preffered_medium: "",
      //current: false,
      preffered_areas: "",
      errors: {}
      //disabled: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const tutionInfoData = {
      expected_min_salary: this.state.expected_min_salary,
      current_Status_for_Tuition: this.state.current_Status_for_Tuition,
      days_per_week: this.state.days_per_week,
      preferred_class: this.state.preferred_class,
      preffered_subject: this.state.preffered_subject,
      preffered_medium: this.state.preffered_medium,
      //current: this.state.current,
      preffered_areas: this.state.preffered_areas
    };

    this.props.addTutionInfo(tutionInfoData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const current_Status_for_Tuition = [
      { label: "Select", value: 0 },
      { label: "Busy", value: "Busy" },
      { label: "available", value: "available" },
      { label: "Deactivated", value: "Deactivated" }
    ];
    const days_per_week = [
      { label: "Select", value: 0 },
      { label: "1 day", value: "1 day" },
      { label: "2day", value: "2day" },
      { label: "3day", value: "3day" },
      { label: "4day", value: "4day" },
      { label: "5day", value: "5day" },
      { label: "6day", value: "6day" }
    ];

    const preffered_medium = [
      { label: "Select", value: 0 },
      { label: "Bangla", value: "Bangla" },
      { label: "English", value: "English" }
    ];

    const preffered_areas = [
      { label: "Select", value: 0 },
      { label: "Dhaka", value: "Dhaka" },
      { label: "Sylhet", value: "Sylhet" },
      { label: "Chittagong", value: "Chittagong" }
    ];

    return (
      <div className="add-education">
        <form onSubmit={this.onSubmit}>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              <strong>Expected Minimum Salary</strong>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors.expected_min_salary
                })}
                placeholder="expected_min_salary"
                name="expected_min_salary"
                value={this.state.expected_min_salary}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              <strong>Current Status for Tuition</strong>
            </label>
            <div className="col-sm-10">
              <SelectListGroup
                name="current_Status_for_Tuition"
                value={this.state.location}
                onChange={this.onChange}
                options={current_Status_for_Tuition}
                error={errors.current_Status_for_Tuition}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              <strong>Days per week</strong>
            </label>
            <div className="col-sm-10">
              <SelectListGroup
                name="days_per_week"
                value={this.state.days_per_week}
                onChange={this.onChange}
                options={days_per_week}
                error={errors.days_per_week}
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              <strong>Preferred class</strong>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors.expected_min_salary
                })}
                placeholder="preferred_class"
                name="preferred_class"
                value={this.state.preferred_class}
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              <strong>Preffered subject</strong>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors.preffered_subject
                })}
                placeholder="preffered_subject"
                name="preffered_subject"
                value={this.state.preffered_subject}
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              <strong>Preffered medium</strong>
            </label>
            <div className="col-sm-10">
              <SelectListGroup
                name="preffered_medium"
                value={this.state.preffered_medium}
                onChange={this.onChange}
                options={preffered_medium}
                error={errors.preffered_medium}
              />
            </div>
          </div>

          <div className="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              <strong>Preffered areas</strong>
            </label>
            <div className="col-sm-10">
              <SelectListGroup
                name="preffered_areas"
                value={this.state.preffered_areas}
                onChange={this.onChange}
                options={preffered_areas}
                error={errors.preffered_areas}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="col">
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AddTutionInfo.propTypes = {
  addTutionInfo: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTutionInfo }
)(withRouter(AddTutionInfo));
