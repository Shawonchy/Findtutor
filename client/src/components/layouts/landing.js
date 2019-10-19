import React, { Component } from "react";
import $ from "jquery";
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
//Import React Scrit Libraray to load Google object
// Import Search Bar Components
//import SearchBar from "material-ui-search-bar";

class landing extends Component {
  constructor() {
    super();
    this.state = {
      division: "",
      district: "",
      upazila: ""
    };
    this.onClick1 = this.onClick1.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitTutor = this.onSubmitTutor.bind(this);
    this.onSubmitTution = this.onSubmitTution.bind(this);
  }

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
    const searchdata = {
      division: this.state.division,
      district: this.state.district,
      upazila: this.state.upazila
    };
    this.props.getTutionByLocation(searchdata, this.props.history);
  }
  onSubmitTutor(e) {
    e.preventDefault();
    const searchdata = {
      division: this.state.division,
      district: this.state.district,
      upazila: this.state.upazila
    };
    this.props.getsearchTutorProfile(searchdata, this.props.history);
  }
  render() {
    return (
      <div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-dom.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

        <div className="container" style={{ width: 600, height: 460 }}>
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
            <div id="home" className="container tab-pane active">
              <br></br>
              <form onSubmit={this.onSubmitTutor}>
                <div className="border p-3 border-primary rounded mb-3 bg-light">
                  <div className="alert alert-success p-2 justify-content-center">
                    <h4 className="text-center">Search Your Desired Tutor</h4>
                  </div>

                  <select
                    name="division"
                    id="division"
                    className="form-control input-lg"
                    value={this.state.division}
                    onChange={this.onChange}
                  >
                    <option value="">Select division</option>
                  </select>
                  <br />
                  <select
                    name="district"
                    id="district"
                    className="form-control input-lg"
                    value={this.state.district}
                    onChange={this.onChange}
                  >
                    <option value="">Select district</option>
                  </select>
                  <br />
                  <select
                    className="mb-3"
                    name="upazila"
                    id="upazila"
                    className="form-control input-lg"
                    value={this.state.upazila}
                    onChange={this.onChange}
                  >
                    <option value="">Select upazila</option>
                  </select>
                </div>
                <div className="form-group d-flex justify-content-center">
                  <button className="btn btn-lg px-5 btn-info mt-4">
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
                    <h4 className="text-center">Search Your Desired Tution</h4>
                  </div>

                  <select
                    name="division"
                    id="division1"
                    className="form-control input-lg"
                    value={this.state.division}
                    onChange={this.onChange}
                  >
                    <option value="">Select division</option>
                  </select>
                  <br />
                  <select
                    name="district"
                    id="district1"
                    className="form-control input-lg"
                    value={this.state.district}
                    onChange={this.onChange}
                  >
                    <option value="">Select district</option>
                  </select>
                  <br />
                  <select
                    className="mb-3"
                    name="upazila"
                    id="upazila1"
                    className="form-control input-lg"
                    value={this.state.upazila}
                    onChange={this.onChange}
                  >
                    <option value="">Select upazila</option>
                  </select>
                </div>
                <div className="form-group d-flex justify-content-center">
                  <button className="btn btn-lg px-5 btn-info mt-4">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
landing.propTypes = {
  getTutionByLocation: PropTypes.func.isRequired,
  getsearchTutorProfile: PropTypes.func.isRequired
};
export default connect(
  null,
  { getTutionByLocation, getsearchTutorProfile }
)(landing);
