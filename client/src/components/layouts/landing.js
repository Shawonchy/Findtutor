import React, { Component } from "react";
import $ from "jquery";
import division from "./division.json";
import district from "./district.json";
import upazilas from "./upazilas.json";
import axios from "axios";
//Import React Scrit Libraray to load Google object
// Import Search Bar Components
//import SearchBar from "material-ui-search-bar";

class landing extends Component {
  componentDidMount() {
    //search box with dependent drop down with jquery ajax and json data
    $(document).ready(function() {
      var divisionOptions = "";
      var districtOptions = "";
      var upazilaOptions = "";

      divisionOptions = '<option value="">Select division</option>';
      $.each(division, function(key, division) {
        divisionOptions +=
          '<option value="' + division.id + '">' + division.name + "</option>";
      });
      $("#division").html(divisionOptions);

      $(document).on("change", "#division", function() {
        var division_id = $(this).val();
        if (division_id != "") {
          districtOptions = '<option value="">Select district</option>';
          $.each(district, function(key, district) {
            if (division_id == district.division_id) {
              districtOptions +=
                '<option value="' +
                district.id +
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
        var district_id = $(this).val();
        if (district_id != "") {
          upazilaOptions += '<option value="">Select upazila</option>';
          $.each(upazilas, function(key, upazila) {
            if (district_id == upazila.district_id) {
              upazilaOptions +=
                '<option value="' +
                upazila.id +
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

  render() {
    return (
      <div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-dom.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        ;
        <div className="container" style={{ width: 600 }}>
          <h2 align="center">Search your Desired tution or tution</h2>
          <br />
          <br />
          <select
            name="division"
            id="division"
            className="form-control input-lg"
          >
            <option value="">Select division</option>
          </select>
          <br />
          <select
            name="district"
            id="district"
            className="form-control input-lg"
          >
            <option value="">Select district</option>
          </select>
          <br />
          <select name="upazila" id="upazila" className="form-control input-lg">
            <option value="">Select upazila</option>
          </select>
        </div>
      </div>
    );
  }
}
export default landing;
