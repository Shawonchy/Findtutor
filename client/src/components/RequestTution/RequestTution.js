import React, { Component } from "react";
import MultiSelect from "@khanacademy/react-multi-select";
//import { MultiSelect } from "@progress/kendo-react-dropdowns";
//import { connect } from "react-redux";
//import PropsTypes from "prop-types";
import { withRouter } from "react-router-dom"; //for this.push purpose(redirecting)
import $ from "jquery";
import division from "../layouts/division.json";
import district from "../layouts/district.json";
import upazilas from "../layouts/upazilas.json";
//import subject from "../layouts/subject.json";
import SelectListGroup from "../Common/SelectListGroup";
import TextFieldGroup from "../Common/TextFieldGroup";
import axios from "axios";
import "./requestution";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const subjectopt = [
  { label: "physics", value: "physics" },
  { label: "chemistry", value: "chemistry" },
  { label: "higher mathematics", value: "higher mathematics" },
  { label: "boilogy", value: "boilogy" },
  { label: "geography", value: "geography" },
  { label: "psychology", value: "psychology" },
  { label: "statics", value: "statics" },
  { label: "eng draw & work prac", value: "eng draw & work prac" },
  { label: "History", value: "History" },
  { label: "Islamic History & Culture", value: "Islamic History & Culture" },
  { label: "Civic & Good Governance", value: "Civic & Good Governance" },
  { label: "Economics", value: "Economics" },
  { label: "Sociology", value: "Sociology" },
  { label: "Social Work", value: "Social Work" },
  { label: "Civic & Good Governance", value: "Civic & Good Governance" },
  { label: "History", value: "History" },
  { label: "Islamic History & Culture", value: "Islamic History & Culture" },
  { label: "Math", value: "Math" },
  { label: "English", value: "English" },
  { label: "Bangla", value: "Bangla" }
];

toast.configure();

class RequestTution extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      name: "",
      division: "",
      district: "",
      upazila: "",
      medium: "",
      class: "",
      subject: [],
      subject1: "",
      institute: "",
      daysperweek: "",
      studentgender: "",
      salaryrange: "",
      tutorgender: "",
      address: "",
      mobile: "",
      email: "",
      instruction: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
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

      // subjectOptions = '<option value="">Select subject</option>';
      // $.each(subject, function(key, subject) {
      //   subjectOptions +=
      //     '<option value="' + subject.name + '">' + subject.name + "</option>";
      // });
      // $("#subject1").html(subjectOptions);
    });

    // this.setState({
    //   subject: this.state.subject1 + this.state.subject
    // });
  }

  onSubmit(e) {
    e.preventDefault();
    const requesttutorData = {
      title: this.state.title,
      name: this.state.name,
      division: this.state.division,
      district: this.state.district,
      upazila: this.state.upazila,
      medium: this.state.medium,
      class: this.state.class,
      subject: this.state.subject,
      institute: this.state.institute,
      daysperweek: this.state.daysperweek,
      studentgender: this.state.studentgender,
      salaryrange: this.state.salaryrange,
      tutorgender: this.state.tutorgender,
      address: this.state.address,
      mobile: this.state.mobile,
      email: this.state.email,
      instruction: this.state.instruction
    };
    axios
      .post("http://localhost:5000/api/request-a-tutor", requesttutorData)
      .then(res => {
        console.log(res.data);
        console.log("successfully posted");
        toast("Success! A tutor will contact with you", { type: "success" });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        toast("Something went wrong", { type: "error" });
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { subject } = this.state;
    console.log(subject);

    const optmedium = [
      { label: "", value: 0 },
      { label: "Bangla", value: "Bangla" },
      { label: "English", value: "English" }
    ];
    const optdaysperweek = [
      { label: "", value: 0 },
      { label: "4days/week", value: "4days/week" },
      { label: "5days/week", value: "5days/week" },
      { label: "3days/week", value: "3days/week" }
    ];
    const optsalaryrange = [
      { label: "", value: 0 },
      { label: "1000-1500", value: "1000-1500" },
      { label: "2000-4000", value: "2000-4000" },
      { label: "4000-6000", value: "4000-6000" }
    ];
    const opttutorgender = [
      { label: "", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" }
    ];
    const optstudentgender = [
      { label: "", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" }
    ];
    const optclass = [
      { label: "", value: 0 },
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
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <form className="well form-horizontal" onSubmit={this.onSubmit}>
            <h2 className="text-center">Ask For a Tutor</h2>
            <p className="text-center mb-4">
              Please complete the following form a tutor will contact with you{" "}
            </p>

            <div className="border p-3 border-primary rounded mb-4 bg-light">
              <div className="alert alert-success p-2">
                <h6 className="mb-0">Tution Title</h6>
              </div>
              <input
                id="title"
                name="title"
                placeholder="Title"
                className="form-control"
                // required="true"
                value={this.state.title}
                onChange={this.onChange}
                type="text"
                required
              ></input>
            </div>

            <div className="border p-3 border-primary rounded mb-4 bg-light">
              <div className="alert alert-success p-2">
                <h6 className="mb-0">Student Informations</h6>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <div className="form-group">
                    <label className="control-label">Full Name</label>
                    <div className=" inputGroupContainer">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="glyphicon glyphicon-home"></i>
                        </span>
                        <input
                          id="name"
                          name="name"
                          placeholder="Full name"
                          className="form-control"
                          // required="true"
                          value={this.state.name}
                          onChange={this.onChange}
                          type="text"
                          required
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label className="control-label">Mobile</label>
                    <div className="inputGroupContainer">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="glyphicon glyphicon-earphone"></i>
                        </span>
                        <input
                          id="mobile"
                          name="mobile"
                          placeholder="Phone Number"
                          className="form-control"
                          // // required="true"
                          type="number"
                          value={this.state.mobile}
                          onChange={this.onChange}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <SelectListGroup
                    placeholder="studentgender"
                    name="studentgender"
                    value={this.state.studentgender}
                    onChange={this.onChange}
                    options={optstudentgender}
                    error={errors.studentgender}
                    label="Gender"
                    info="Give us an idea of your studentgender"
                  />
                </div>
              </div>

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
                  <div className="form-group">
                    <label className="control-label">Institute</label>
                    <div className="inputGroupContainer">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="glyphicon glyphicon-home"></i>
                        </span>
                        <input
                          id="institute"
                          name="institute"
                          placeholder="institute"
                          class="form-control"
                          type="text"
                          value={this.state.institute}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <SelectListGroup
                    placeholder="class"
                    name="class"
                    value={this.state.class}
                    onChange={this.onChange}
                    options={optclass}
                    error={errors.class}
                    label="Select Class"
                    //  info="Give us an idea of your tutorgender"
                  />
                </div>
                <div className="col-md-4">
                  <SelectListGroup
                    placeholder="medium"
                    name="medium"
                    value={this.state.medium}
                    onChange={this.onChange}
                    options={optmedium}
                    error={errors.medium}
                    //info="Give us an idea of your medium"
                    label="Select Medium"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label for="address">Detail Address</label>
                    <textarea
                      className="form-control rounded-0"
                      id="address"
                      rows="2"
                      name="address"
                      type="text"
                      value={this.state.address}
                      onChange={this.onChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="border p-3 border-primary rounded mb-4 bg-light">
              <div className="alert alert-success p-2">
                <h6 className="mb-0">Desired tutor Informations</h6>
              </div>

              <div className="row">
                <div class="col-md-6">
                  <SelectListGroup
                    placeholder="tutorgender"
                    name="tutorgender"
                    value={this.state.tutorgender}
                    onChange={this.onChange}
                    options={opttutorgender}
                    error={errors.tutorgender}
                    label="Tutor gender"
                    //  info="Give us an idea of your tutorgender"
                  />
                </div>
                <div class="col-md-6">
                  <SelectListGroup
                    placeholder="salaryrange"
                    name="salaryrange"
                    value={this.state.salaryrange}
                    onChange={this.onChange}
                    options={optsalaryrange}
                    error={errors.salaryrange}
                    label="Salary Range"
                    info="Give us an idea of your salaryrange"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <SelectListGroup
                    placeholder="daysperweek"
                    name="daysperweek"
                    value={this.state.daysperweek}
                    onChange={this.onChange}
                    options={optdaysperweek}
                    error={errors.daysperweek}
                    info="Give us an idea of your daysperweek"
                    label="Days Per Week"
                  />
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="control-label">Select subject</label>

                    <MultiSelect
                      options={subjectopt}
                      selected={subject}
                      onSelectedChanged={subject => this.setState({ subject })}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label for="subject">
                      Additional Informations/Instructions for tutor{" "}
                    </label>
                    <textarea
                      className="form-control rounded-0"
                      id="instruction"
                      rows="2"
                      name="instruction"
                      type="text"
                      value={this.state.instruction}
                      onChange={this.onChange}
                    ></textarea>
                  </div>
                </div>
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
export default withRouter(RequestTution);
