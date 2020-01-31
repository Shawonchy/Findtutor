import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import $ from "jquery";
import PropTypes from "prop-types";
import classnames from "classnames";
import TextFieldGroup from "../Common/TextFieldGroup";
import division from "../layouts/division.json";
import district from "../layouts/district.json";
import upazilas from "../layouts/upazilas.json";
import subject from "../layouts/subject.json";
import TextAreaFieldGroup from "../Common/TextAreaFieldGroup"; //input text in a large area
import InputGroup from "../Common/InputGroup"; //input for social media link
import SelectListGroup from "../Common/SelectListGroup";
import { createProfile } from "../../actions/ProfileAction";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      experience: "",
      company: "",
      website: "",
      location: "",
      division: "",
      district: "",
      upazila: "",
      expert: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {},
      gender: ""
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

      subjectOptions = '<option value="">Select subject</option>';
      $.each(subject, function(key, subject) {
        subjectOptions +=
          '<option value="' + subject.name + '">' + subject.name + "</option>";
      });
      $("#subject1").html(subjectOptions);
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      //location: this.state.location,
      division: this.state.division,
      district: this.state.district,
      upazila: this.state.upazila,
      expert: this.state.expert,
      experience: this.state.experience,
      skills: this.state.skills,
      // bio: this.state.bio,
      // twitter: this.state.twitter,
      // facebook: this.state.facebook,
      // linkedin: this.state.linkedin,
      // youtube: this.state.youtube,
      // instagram: this.state.instagram,
      gender: this.state.gender
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    const options = [
      { label: "* Select your gender", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" }
    ];
    //for social inputs like facebook,twitter
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    return (
      <div className="create-profile">
        <div className="container vh-100">
          {/* <div className="row">
            <div className="col-md-8">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="handle"
                  //"*" for is required
                  placeholder="* profile handle"
                  value={this.state.handle}
                  error={errors.handle}
                  onChange={this.onChange}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <TextFieldGroup
                  name="experience"
                  //"*" for is required
                  placeholder="experience"
                  value={this.state.experience}
                  error={errors.experience}
                  onChange={this.onChange}
                  info="tell us you have experience of how many years"
                />
                <TextFieldGroup
                  name="location"
                  //"*" for is required
                  placeholder="* location"
                  value={this.state.location}
                  error={errors.location}
                  onChange={this.onChange}
                  info="City or city & state suggested"
                />
                <TextFieldGroup
                  name="status"
                  //"*" for is required
                  placeholder="* status"
                  value={this.state.status}
                  error={errors.status}
                  onChange={this.onChange}
                  info="your status"
                />
                <TextFieldGroup
                  name="skills"
                  //"*" for is required
                  placeholder="* skills"
                  value={this.state.skills}
                  error={errors.skills}
                  onChange={this.onChange}
                  info="Please use comma separated values (eg.
                    PHYSICS,MATH,ENGLISH)"
                />
                <TextAreaFieldGroup
                  name="bio"
                  //"*" for is required
                  placeholder="bio"
                  value={this.state.bio}
                  error={errors.bio}
                  onChange={this.onChange}
                  info="Tell us a little about yourself"
                />
                <SelectListGroup
                  placeholder="gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  options={options}
                  error={errors.gender}
                  info="Give us an idea of your gender"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      //toggle the button state true or false to verify button works
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                  {socialInputs}
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </div>
              </form>
            </div>
          </div> */}
          <div className="row justify-content-center">
            <form onSubmit={this.onSubmit}>
              <h2 className="text-center">Create Your Profile</h2>
              <p className="text-center mb-4">
                Let's get some information to make your profile stand out{" "}
              </p>
              <div className="border p-3 border-primary rounded mb-2 bg-light">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="control-label">Handle</label>
                      <div className="input-group">
                        <input
                          id="handle"
                          name="handle"
                          placeholder="handle"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.handle
                            }
                          )}
                          // required="true"
                          value={this.state.handle}
                          onChange={this.onChange}
                          type="text"
                          required
                        ></input>
                        {errors.handle && (
                          <div className="invalid-feedback">
                            {errors.handle}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <SelectListGroup
                      placeholder="gender"
                      name="gender"
                      value={this.state.gender}
                      onChange={this.onChange}
                      options={options}
                      error={errors.gender}
                      label="Select Gender"
                      info="Give us an idea of your gender"
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
                            name="expert"
                            id="subject1"
                            className="form-control input-lg"
                            value={this.state.expert}
                            onChange={this.onChange}
                          >
                            <option value="">Select subject</option>
                          </select>
                        </div>
                      </div>
                    </div>
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
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="control-label">
                        Subjects Which you are skilled in
                      </label>
                      <div className="input-group">
                        <input
                          id="skills"
                          name="skills"
                          placeholder="skills"
                          className="form-control"
                          // required="true"
                          value={this.state.skills}
                          onChange={this.onChange}
                          type="text"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label for="subject">
                        Share your experience in tutions
                      </label>
                      <textarea
                        className="form-control rounded-0"
                        id="experience"
                        rows="2"
                        name="experience"
                        type="text"
                        value={this.state.experience}
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
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
