import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import $ from "jquery";
//import TextAreaFieldGroup from "../Common/TextAreaFieldGroup";
//import TextFieldGroup from "../Common/TextFieldGroup";
import SelectListGroup from "../Common/SelectListGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTutionInfo } from "../../actions/ProfileAction";
import division from "../layouts/division.json";
import district from "../layouts/district.json";
import upazilas from "../layouts/upazilas.json";
import subject from "../layouts/subject.json";

class AddTutionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expected_min_salary: "",
      division: "",
      district: "",
      upazila: "",
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
      preffered_areas: this.state.preffered_areas,
      division: this.state.division,
      district: this.state.district,
      upazila: this.state.upazila
    };

    this.props.addTutionInfo(tutionInfoData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    //search box with dependent drop down with jquery ajax and json data
    $(document).ready(function() {
      var divisionOptions = "";
      var districtOptions = "";
      var upazilaOptions = "";
      var subjectOptions = "";

      divisionOptions = '<option value="">Select division</option>';
      $.each(division, function(key, division) {
        divisionOptions +=
          '<option  data-id="' +
          division.id +
          '" value="' +
          division.name +
          '">' +
          division.name +
          "</option>";
      });
      $("#division").html(divisionOptions);

      $(document).on("change", "#division", function() {
        var division_id = $(this)
          .find(":selected")
          .data("id");
        console.log(division_id);
        if (division_id != "") {
          districtOptions = '<option value="">Select district</option>';
          $.each(district, function(key, district) {
            if (division_id == district.division_id) {
              districtOptions +=
                '<option  data-id="' +
                district.id +
                '"   value="' +
                district.name +
                '">' +
                district.name +
                "</option>";
            }
          });
          $("#district").html(districtOptions);
        } else {
          $("#district").html('<option value="">Select district</option>');
          $("#upazila").html('<option value="">Select upazila</option>');
        }
      });
      $(document).on("change", "#district", function() {
        upazilaOptions = null;
        var district_id = $(this)
          .find(":selected")
          .data("id"); //getting id from selected options
        if (district_id != "") {
          upazilaOptions += '<option value="">Select upazila</option>';
          $.each(upazilas, function(key, upazila) {
            if (district_id == upazila.district_id) {
              upazilaOptions +=
                '<option data-id="' +
                upazila.id +
                '"       value="' +
                upazila.name +
                '">' +
                upazila.name +
                "</option>";
            }
          });
          $("#upazila").html(upazilaOptions);
        } else {
          $("#upazila").html('<option value="">Select upazila</option>');
        }
      });

      subjectOptions = '<option value="">Select subject</option>';
      $.each(subject, function(key, subject) {
        subjectOptions +=
          '<option value="' + subject.name + '">' + subject.name + "</option>";
      });
      $("#subject1").html(subjectOptions);
    });

    this.setState({
      subject: this.state.subject1 + this.state.subject
    });
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
      { label: "Select daysperweek", value: 0 },
      { label: "4days/week", value: "4days/week" },
      { label: "5days/week", value: "5days/week" },
      { label: "3days/week", value: "3days/week" }
    ];

    const preffered_medium = [
      { label: "Select", value: 0 },
      { label: "Bangla", value: "Bangla" },
      { label: "English", value: "English" }
    ];

    const expected_min_salary = [
      { label: "Select salaryrange", value: 0 },
      { label: "1000-1500", value: "1000-1500" },
      { label: "2000-4000", value: "2000-4000" },
      { label: "4000-6000", value: "4000-6000" }
    ];
    const preferred_class = [
      { label: "Select Class", value: 0 },
      { label: "class I", value: "class I" },
      { label: "class II", value: "class II" },
      { label: "class III", value: "class III" },
      { label: "class IV", value: "class IV" },
      { label: "class V", value: "class V" },
      { label: "class VI", value: "class VI" },
      { label: "class VII", value: "class VII" },
      { label: "class VIII", value: "class VIII" },
      { label: "class X", value: "class X" },
      { label: "class XI", value: "class XI" },
      { label: "class XII", value: "class XII" }
    ];

    return (
      <div className="add-education">
        <Link to="/dashboard" className="btn btn-light">
          Go Back
        </Link>
        <div className="border p-3 border-primary rounded mb-4 bg-light">
          <div className="alert alert-success p-2">
            <h6 className="mb-0">Add/Edit Tution Info</h6>
          </div>
          <form className="well form-horizontal" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label className="control-label">Select Division</label>
                  <div className="inputGroupContainer">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-home"></i>
                      </span>
                      <select
                        name="division"
                        id="division"
                        className="form-control input-lg"
                        value={this.state.division}
                        onChange={this.onChange}
                      >
                        <option value="">Select division</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="control-label">Select District</label>
                  <div className="inputGroupContainer">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-home"></i>
                      </span>
                      <select
                        name="district"
                        id="district"
                        className="form-control input-lg"
                        value={this.state.district}
                        onChange={this.onChange}
                      >
                        <option value="">Select district</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="control-label">Select Upazila</label>
                  <div className="inputGroupContainer">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-home"></i>
                      </span>
                      <select
                        name="upazila"
                        id="upazila"
                        className="form-control input-lg"
                        value={this.state.upazila}
                        onChange={this.onChange}
                      >
                        <option value="">Select upazila</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <SelectListGroup
                  placeholder="preferred_class"
                  name="preferred_class"
                  value={this.state.preferred_class}
                  onChange={this.onChange}
                  options={preferred_class}
                  error={errors.preferred_class}
                  label="Preferred class"
                  info="Give us an idea of your studentgender"
                />
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="control-label">Select subject</label>
                  <div className="inputGroupContainer">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-home"></i>
                      </span>
                      <select
                        name="preffered_subject"
                        id="subject1"
                        className="form-control input-lg"
                        value={this.state.preffered_subject}
                        onChange={this.onChange}
                      >
                        <option value="">Select subject</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <SelectListGroup
                    placeholder="preffered_medium"
                    label="Preffered medium"
                    name="preffered_medium"
                    value={this.state.preffered_medium}
                    onChange={this.onChange}
                    options={preffered_medium}
                    error={errors.preffered_medium}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <SelectListGroup
                  placeholder="salaryrange"
                  name="expected_min_salary"
                  value={this.state.expected_min_salary}
                  onChange={this.onChange}
                  options={expected_min_salary}
                  error={errors.expected_min_salary}
                  label="Salary Range"
                  info="Give us an idea of your salaryrange"
                />
              </div>
              <div className="col-md-4">
                <SelectListGroup
                  name="current_Status_for_Tuition"
                  value={this.state.current_Status_for_Tuition}
                  onChange={this.onChange}
                  options={current_Status_for_Tuition}
                  error={errors.current_Status_for_Tuition}
                  label="Current Status"
                />
              </div>
              <div className="col-md-4">
                <SelectListGroup
                  name="days_per_week"
                  value={this.state.days_per_week}
                  onChange={this.onChange}
                  options={days_per_week}
                  error={errors.days_per_week}
                  label="Days per week"
                />
              </div>
            </div>
            <div className="form-group d-flex justify-content-center">
              <input
                type="submit"
                value="Submit"
                className="btn btn-lg px-5 btn-info mt-4"
              />
            </div>
          </form>
        </div>
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
