import React, { Component } from "react";
import classnames from "classnames";
import $ from "jquery";
import MultiSelect from "@khanacademy/react-multi-select";
import division from "./division.json";
import district from "./district.json";
import upazilas from "./upazilas.json";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { getTutionByLocation } from "../../actions/TutionAction";
import { getsearchTutorProfile } from "../../actions/ProfileAction";
import { getProfiles } from "../../actions/ProfileAction";
import PremiumTutorItems from "./PremiumTutorItems";
import SelectListGroup from "../Common/SelectListGroup";
import landing_jpg from "../../landing.jpg";
import rajat from "./Premium_tutors/rajat.jpg";
import dip from "./Premium_tutors/dipBatt.jpg";
import rahul from "./Premium_tutors/rahulchy.jpg";
import Spinner from "../Common/Spinner";
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

class landing extends Component {
  constructor() {
    super();
    this.state = {
      division: "",
      district: "",
      upazila: "",
      preffered_subject: [],
      //salaryRange:"",
      preffered_medium: "",
      class: "",
      Errordivision: "",
      Errordistrict: "",
      Errorupazila: "",
      Errormedium: "",
      Errorsubject: "",
      Errorclass: ""
    };
    this.onClick1 = this.onClick1.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitTutor = this.onSubmitTutor.bind(this);
    this.onSubmitTution = this.onSubmitTution.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate = () => {
    let Errordivision = "";
    let Errordistrict = "";
    let Errorupazila = "";
    let Errormedium = "";
    let Errorsubject = "";
    let Errorclass = "";

    if (!this.state.division) {
      Errordivision = "Division field is needed";
    }
    if (!this.state.district) {
      Errordistrict = "District field is needed";
    }
    if (!this.state.upazila) {
      Errorupazila = "upazila field is needed";
    }
    if (!this.state.preffered_medium) {
      Errormedium = "Medium field is needed";
    }
    if (!this.state.preffered_subject) {
      Errorsubject = "Subject field is needed";
    }
    // if (!this.state.class) {
    //   Errorclass = "class field is needed";
    // }
    if (
      Errordivision ||
      Errordistrict ||
      Errorupazila ||
      Errormedium ||
      Errorsubject
    ) {
      this.setState({
        Errordivision,
        Errordistrict,
        Errorupazila,
        Errormedium,
        Errorsubject
      });
      return false;
    }

    return true;
  };

  onClick1(e) {
    //search box with dependent drop down with jquery ajax and json data
    $(document).ready(function() {
      var divisionOptions1 = "";
      var districtOptions1 = "";
      var upazilaOptions1 = "";

      divisionOptions1 = '<option value="">Select division</option>';
      $.each(division, function(key, division) {
        divisionOptions1 +=
          '<option  data-id="' +
          division.id +
          '" value="' +
          division.name +
          '">' +
          division.name +
          "</option>";
      });
      $("#division1").html(divisionOptions1);

      $(document).on("change", "#division1", function() {
        var division_id = $(this)
          .find(":selected")
          .data("id");
        console.log(division_id);
        if (division_id != "") {
          districtOptions1 = '<option value="">Select district</option>';
          $.each(district, function(key, district) {
            if (division_id == district.division_id) {
              districtOptions1 +=
                '<option  data-id="' +
                district.id +
                '"   value="' +
                district.name +
                '">' +
                district.name +
                "</option>";
            }
          });
          $("#district1").html(districtOptions1);
        } else {
          $("#district1").html('<option value="">Select district</option>');
          $("#upazila1").html('<option value="">Select upazila</option>');
        }
      });
      $(document).on("change", "#district1", function() {
        upazilaOptions1 = null;
        var district_id = $(this)
          .find(":selected")
          .data("id"); //getting id from selected options
        if (district_id != "") {
          upazilaOptions1 += '<option value="">Select upazila</option>';
          $.each(upazilas, function(key, upazila) {
            if (district_id == upazila.district_id) {
              upazilaOptions1 +=
                '<option data-id="' +
                upazila.id +
                '"       value="' +
                upazila.name +
                '">' +
                upazila.name +
                "</option>";
            }
          });
          $("#upazila1").html(upazilaOptions1);
        } else {
          $("#upazila1").html('<option value="">Select upazila</option>');
        }
      });
    });
  }
  componentWillMount() {
    this.props.getProfiles();
  }

  componentDidMount() {
    //search box with dependent drop down with jquery ajax and json data
    $(document).ready(function() {
      var divisionOptions = "";
      var districtOptions = "";
      var upazilaOptions = "";

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
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitTution(e) {
    e.preventDefault();
    const isvalid = this.validate();
    if (isvalid) {
      const searchdata = {
        division: this.state.division,
        district: this.state.district,
        upazila: this.state.upazila,
        class: this.state.class,
        //salaryRange:this.state.//salaryRange,
        preffered_medium: this.state.preffered_medium
      };
      this.props.getTutionByLocation(searchdata, this.props.history);
      this.setState({
        Errordivision: "",
        Errordistrict: "",
        Errorupazila: "",
        Errormedium: "",
        Errorclass: "",
        Errorsubject: ""
      });
    }
  }
  onSubmitTutor(e) {
    e.preventDefault();
    const isvalid = this.validate();
    console.log(isvalid);
    if (isvalid) {
      const searchdata = {
        division: this.state.division,
        district: this.state.district,
        upazila: this.state.upazila,

        preffered_subject: this.state.preffered_subject[0],
        //salaryRange:this.state.//salaryRange,
        preffered_medium: this.state.preffered_medium
      };
      console.log(searchdata);
      this.props.getsearchTutorProfile(searchdata, this.props.history);
      this.setState({
        Errordivision: "",
        Errordistrict: "",
        Errorupazila: "",
        Errormedium: "",
        Errorclass: "",
        Errorsubject: ""
      });
    }
  }
  render() {
    const { profiles, loading } = this.props.profile;
    console.log(typeof profiles);
    let premiumtutoritems;
    if (profiles == null || loading) {
      premiumtutoritems = Spinner;
    }
    //const errors = this.state.errors;
    //console.log(errors);
    const preffered_medium = [
      { label: "Select Medium", value: 0 },
      { label: "Bangla", value: "Bangla" },
      { label: "English", value: "English" }
    ];

    const optclass = [
      { label: "Select studentClass", value: 0 },
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
      <div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-dom.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

        <div className="container-fluid home pt-0">
          <div className="row backgrndimg">
            <div className="col-7"></div>
            <div className="col-5">
              <ul class="nav nav-pills" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" data-toggle="pill" href="#home">
                    Tutor
                  </a>
                </li>
                <li class="nav-item" onClick={this.onClick1}>
                  <a class="nav-link" data-toggle="pill" href="#menu1">
                    Tution
                  </a>
                </li>
              </ul>

              <div class="tab-content">
                <div id="home" className="container tab-pane active mb-2">
                  <br></br>
                  <form onSubmit={this.onSubmitTutor}>
                    <div className="border p-3 border-primary rounded mb-3 bg-light">
                      <div className="alert alert-success p-2 justify-content-center">
                        <h4 className="text-center">
                          Search Your Desired Tutor
                        </h4>
                      </div>

                      <select
                        name="division"
                        id="division"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": this.state.Errordivision
                        })}
                        value={this.state.division}
                        onChange={this.onChange}
                      >
                        <option value="">Select division</option>
                      </select>
                      {this.state.Errordivision && (
                        <div className="is-invalid">
                          {this.state.Errordivision}
                        </div> //errors will be printed in registration UI
                      )}
                      <br />
                      <select
                        name="district"
                        id="district"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": this.state.Errordistrict
                        })}
                        value={this.state.district}
                        onChange={this.onChange}
                      >
                        <option value="">Select district</option>
                      </select>
                      {this.state.Errordistrict && (
                        <div className="is-invalid">
                          {this.state.Errordistrict}
                        </div> //errors will be printed in registration UI
                      )}
                      <br />
                      <select
                        className="mb-3"
                        name="upazila"
                        id="upazila"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": this.state.Errorupazila
                        })}
                        value={this.state.upazila}
                        onChange={this.onChange}
                      >
                        <option value="">Select upazila</option>
                      </select>
                      {this.state.Errorupazila && (
                        <div className="is-invalid">
                          {this.state.Errorupazila}
                        </div> //errors will be printed in registration UI
                      )}

                      <SelectListGroup
                        placeholder="preffered_medium"
                        label=""
                        name="preffered_medium"
                        value={this.state.preffered_medium}
                        onChange={this.onChange}
                        options={preffered_medium}
                        error={this.state.Errormedium}
                      />
                      <MultiSelect
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": this.state.Errorsubject
                        })}
                        options={subjectopt}
                        selected={this.state.preffered_subject}
                        onSelectedChanged={preffered_subject =>
                          this.setState({ preffered_subject })
                        }
                      />
                      {this.state.Errorsubject && (
                        <div className="is-invalid">
                          {this.state.Errorsubject}
                        </div> //errors will be printed in registration UI
                      )}
                    </div>
                    <div className="form-group d-flex justify-content-center">
                      <button className="btn btn-lg px-5 btn-info">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
                <div id="menu1" class="container tab-pane fade">
                  <br></br>
                  <form onSubmit={this.onSubmitTution}>
                    <div className="border p-3 border-primary rounded mb-3 bg-light">
                      <div className="alert alert-success p-2 justify-content-center">
                        <h4 className="text-center">
                          Search Your Desired Tution
                        </h4>
                      </div>

                      <select
                        name="division"
                        id="division"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": this.state.Errordivision
                        })}
                        value={this.state.division}
                        onChange={this.onChange}
                      >
                        <option value="">Select division</option>
                      </select>
                      {this.state.Errordivision && (
                        <div className="is-invalid">
                          {this.state.Errordivision}
                        </div> //errors will be printed in registration UI
                      )}
                      <br />
                      <select
                        name="district"
                        id="district"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": this.state.Errordistrict
                        })}
                        value={this.state.district}
                        onChange={this.onChange}
                      >
                        <option value="">Select district</option>
                      </select>
                      {this.state.Errordistrict && (
                        <div className="is-invalid">
                          {this.state.Errordistrict}
                        </div> //errors will be printed in registration UI
                      )}
                      <br />
                      <select
                        className="mb-3"
                        name="upazila"
                        id="upazila"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": this.state.Errorupazila
                        })}
                        value={this.state.upazila}
                        onChange={this.onChange}
                      >
                        <option value="">Select upazila</option>
                      </select>
                      {this.state.Errorupazila && (
                        <div className="is-invalid">
                          {this.state.Errorupazila}
                        </div> //errors will be printed in registration UI
                      )}

                      <SelectListGroup
                        placeholder="class"
                        name="class"
                        value={this.state.class}
                        onChange={this.onChange}
                        options={optclass}
                        error={this.state.Errorclass}
                        label=""
                        // info="Give us an idea of your tutorgender"
                      />
                      <SelectListGroup
                        placeholder="preffered_medium"
                        label=""
                        name="preffered_medium"
                        value={this.state.preffered_medium}
                        onChange={this.onChange}
                        options={preffered_medium}
                        error={this.state.Errormedium}
                      />
                    </div>
                    <div className="form-group d-flex justify-content-center">
                      <button className="btn btn-lg px-5 btn-info">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <h2 className="py-4 mb-3 display-4 headingTutor">
            Our Featured Tutor
          </h2>
          <div className="row premium_tutor pt-5">
            <div className="col-md-2">
              <div className="card m-auto" style={{ width: "18rem" }}>
                <img src={rajat} alt="Jane" style={{ width: "100%" }} />
                <div className="container">
                  <h2>Jane Doe</h2>
                  <p className="title">CEO &amp; Founder</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>example@example.com</p>
                  <p>
                    <button className="button">Contact</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card m-auto" style={{ width: "18rem" }}>
                <img src={dip} alt="Mike" style={{ width: "100%" }} />
                <div className="container">
                  <h2>Mike Ross</h2>
                  <p className="title">Art Director</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>example@example.com</p>
                  <p>
                    <button className="button">Contact</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card m-auto" style={{ width: "18rem" }}>
                <img src={rahul} alt="John" style={{ width: "100%" }} />
                <div className="container">
                  <h2>John Doe</h2>
                  <p className="title">Designer</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>example@example.com</p>
                  <p>
                    <button className="button">Contact</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card m-auto" style={{ width: "18rem" }}>
                <img
                  src={require("./Premium_tutors/dip.jpg")}
                  alt="John"
                  style={{ width: "100%" }}
                />
                <div className="container">
                  <h2>Dip Protik</h2>
                  <p className="title">Designer</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>example@example.com</p>
                  <p>
                    <button className="button">Contact</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card m-auto" style={{ width: "18rem" }}>
                <img
                  src={require("./Premium_tutors/rafi.jpg")}
                  alt="John"
                  style={{ width: "100%" }}
                />
                <div className="container">
                  <h2>Osman Rafi</h2>
                  <p className="title">Designer</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>example@example.com</p>
                  <p>
                    <button className="button">Contact</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card m-auto" style={{ width: "18rem" }}>
                <img
                  src={require("./Premium_tutors/kundo.jpg")}
                  alt="John"
                  style={{ width: "100%" }}
                />
                <div className="container">
                  <h2>Shawon Kundo</h2>
                  <p className="title">Designer</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>example@example.com</p>
                  <p>
                    <button className="button">Contact</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <h2 className="py-4 mb-3 display-4 headingTutor">
            Our Featured Tutions
          </h2>
          <div className="row premium_tutor pt-5">
            <div className="col-md-2">
              <div
                className="card text-white bg-light"
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h2>Need Tutor For Class V</h2>
                  <p className="card-text">
                    Location:Dhaka <br></br>Salary:5000<br></br>4 days per week
                  </p>
                  <button className="button">View Details</button>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div
                className="card text-white bg-light"
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h2>Need Tutor For Class V</h2>
                  <p className="card-text">
                    Location:Dhaka <br></br>Salary:5000<br></br>4 days per week
                  </p>
                  <button className="button">View Details</button>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div
                className="card text-white bg-light"
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h2>Need Tutor For Class V</h2>
                  <p className="card-text">
                    Location:Dhaka <br></br>Salary:5000<br></br>4 days per week
                  </p>
                  <button className="button">View Details</button>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div
                className="card text-white bg-light"
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h2>Need Tutor For Class V</h2>
                  <p className="card-text">
                    Location:Dhaka <br></br>Salary:5000<br></br>4 days per week
                  </p>
                  <button className="button">View Details</button>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div
                className="card text-white bg-light"
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h2>Need Tutor For Class V</h2>
                  <p className="card-text">
                    Location:Dhaka <br></br>Salary:5000<br></br>4 days per week
                  </p>
                  <button className="button">View Details</button>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div
                className="card text-white bg-light"
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h2>Need Tutor For Class V</h2>
                  <p className="card-text">
                    Location:Dhaka <br></br>Salary:5000<br></br>4 days per week
                  </p>
                  <button className="button">View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
landing.propTypes = {
  getTutionByLocation: PropTypes.func.isRequired,
  getsearchTutorProfile: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, {
  getTutionByLocation,
  getsearchTutorProfile,
  getProfiles
})(landing);
