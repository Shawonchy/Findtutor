import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Education from "./Education";
import { Link } from "react-router-dom";
import axios from "axios";
import isEmpty from "../../validation/isEmpty";

class DashboardProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    };
  }
  //taking the binary data of the image and convert to base64 string
  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach(b => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
  //rendering image
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/profile/getphoto")
      .then(res => {
        console.log(res.data.data);
        var base64Flag = "data:image/jpeg;base64,";
        var imageStr = this.arrayBufferToBase64(res.data.data.data);
        this.setState({
          img: base64Flag + imageStr
        });
      })
      .catch(err => console.log("error occured"));
  }
  render() {
    const { img } = this.state;
    console.log(img);
    const { user } = this.props.auth;
    console.log(user);
    const { profile } = this.props.profile;
    console.log(profile.tution_info);
    console.log(profile.education);

    let tutionInfoContent;
    if (typeof profile.tution_info == "undefined") {
      tutionInfoContent = (
        <table className="table table-bordered">
          <tr>
            <th className="bg-light">Expected Salary</th>
            <td></td>
          </tr>
          <tr>
            <th className="bg-light">Days Per Week</th>
            <td></td>
          </tr>
          <tr>
            <th className="bg-light">Preffered Subject</th>
            <td></td>
          </tr>
          <tr>
            <th className="bg-light">Preffered Class</th>
            <td></td>
          </tr>
          <tr>
            <th className="bg-light">Preffered Medium</th>
            <td></td>
          </tr>
          <tr>
            <th className="bg-light">Current Status</th>
            <td></td>
          </tr>
        </table>
      );
    } else {
      tutionInfoContent = (
        <table className="table table-bordered">
          <tr>
            <th className="bg-light">Expected Salary</th>
            <td>
              {
                (profile.tution_info.expected_min_salary = !isEmpty(
                  profile.tution_info.expected_min_salary
                )
                  ? profile.tution_info.expected_min_salary
                  : "")
              }
            </td>
          </tr>
          <tr>
            <th className="bg-light">Days Per Week</th>
            <td>
              {
                (profile.tution_info.days_per_week = !isEmpty(
                  profile.tution_info.days_per_week
                )
                  ? profile.tution_info.days_per_week
                  : "")
              }
            </td>
          </tr>
          <tr>
            <th className="bg-light">Preffered Subject</th>
            <td>
              {
                /* {(profile.tution_info.preffered_subject = !isEmpty(
                profile.tution_info.preffered_subject
              )
                ? profile.tution_info.preffered_subject
                : "") */
                (profile.tution_info.preffered_subject = profile.tution_info.preffered_subject.toString())
              }
            </td>
          </tr>
          <tr>
            <th className="bg-light">Preffered Class</th>
            <td>
              {
                (profile.tution_info.preferred_class = !isEmpty(
                  profile.tution_info.preferred_class
                )
                  ? profile.tution_info.preferred_class
                  : "")
              }
            </td>
          </tr>
          <tr>
            <th className="bg-light">Preffered Medium</th>
            <td>
              {
                (profile.tution_info.preffered_medium = !isEmpty(
                  profile.tution_info.preffered_medium
                )
                  ? profile.tution_info.preffered_medium
                  : "")
              }
            </td>
          </tr>
          <tr>
            <th className="bg-light">Current Status</th>
            <td>
              {
                (profile.tution_info.current_Status_for_Tuition = !isEmpty(
                  profile.tution_info.current_Status_for_Tuition
                )
                  ? profile.tution_info.current_Status_for_Tuition
                  : "")
              }
            </td>
          </tr>
        </table>
      );
    }
    return (
      <div>
        <div className="row mb-3">
          <div className="col-md-6">
            <img
              width="120px"
              height="200px"
              src={img}
              alt="Helpful alt text"
            />
          </div>
          <div className="col-md-6">
            {/* <h2 className="text-left">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </h2>

            <div>Qualification:</div>
            <div>Experience:</div>
            <div>Area covered:</div>
            <div>Teaching:</div>
            <div>Phone:</div>
            <div>Email:</div> */}
            <div className="alert alert-success p-2">
              <h5 className="mb-0">Welcome {user.name}</h5>
            </div>
            <table className="table table-bordered">
              {/* <tr>
                <th className="bg-light">Qualification</th>
                <td></td>
              </tr> */}
              <tr>
                <th className="bg-light">Experience</th>
                <td>
                  {
                    (profile.experience = !isEmpty(profile.experience)
                      ? profile.experience
                      : "")
                  }
                </td>
              </tr>
              <tr>
                <th className="bg-light">Area Covered</th>
                <td>
                  {
                    (profile.upazila = !isEmpty(profile.upazila)
                      ? profile.upazila
                      : "")
                  }
                </td>
              </tr>
              <tr>
                <th className="bg-light">Phone</th>
                <td>{(user.phone = !isEmpty(user.phone) ? user.phone : "")}</td>
              </tr>
              <tr>
                <th className="bg-light">Email</th>
                <td>{(user.email = !isEmpty(user.email) ? user.email : "")}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <div class="alert alert-info">Tution Info</div>
            {tutionInfoContent}
          </div>
          <div className="col-md-3">
            <Link to="/tution-info" className="btn btn-primary btn-sm mt-2">
              Add tution info
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <div class="alert alert-info">Educational Qualification</div>
            <Education education={profile.education} />
          </div>
          <div className="col-md-3">
            <Link to="/add-education" className="btn btn-primary btn-sm mt-2">
              Edit education
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

DashboardProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps)(DashboardProfile);
