import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Education from "./Education";
import { Link } from "react-router-dom";
import axios from "axios";

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
    axios.get("http://localhost:5000/api/profile/getphoto").then(res => {
      console.log(res.data.data);
      var base64Flag = "data:image/jpeg;base64,";
      var imageStr = this.arrayBufferToBase64(res.data.data.data);
      this.setState({
        img: base64Flag + imageStr
      });
    });
  }

  render() {
    const { img } = this.state;
    console.log(img);
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    return (
      <div className="col">
        <div className="row">
          <div className="col">
            <img
              width="120px"
              height="200px"
              src={img}
              alt="Helpful alt text"
            />
          </div>
          <div className="col">
            <h2 className="text-left">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </h2>

            <div>Qualification:</div>
            <div>Experience:</div>
            <div>Area covered:</div>
            <div>Teaching:</div>
            <div>Phone:</div>
            <div>Email:</div>
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <h2>Tution info:</h2>
            <div>
              Expected salary: {profile.tution_info.expected_min_salary}
            </div>
            <div>Days per week: {profile.tution_info.days_per_week}</div>
            <div>
              Preffered subject: {profile.tution_info.preffered_subject}
            </div>
            <div>
              Preffered className: {profile.tution_info.preferred_class}
            </div>
            <div>Preffered Medium: {profile.tution_info.preffered_medium}</div>
            <div>
              Current Status for Tuition:{" "}
              {profile.tution_info.current_Status_for_Tuition}
            </div>
          </div>

          <div className="col">
            <Link to="/tution-info">Add tution info</Link>
          </div>
        </div>

        {/* <div className="row">
          <div className="col">
            <h2>Educational Qualification:</h2>
            <div className="datagrid">
              <table className="table">
                <thead>
                  <tr>
                    <th>Exam</th>
                    <th>Institute</th>
                    <th>Column 2</th>
                    <th>Column 4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cell 1</td>
                    <td>Cell 2</td>
                    <td>Text</td>
                    <td>Text</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4">
                      <div className="paging" />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div
        </div> */}
        <div className="row">
          <div className="row">
            <div className="col-9">
              <h2>Educational Qualification:</h2>
            </div>
            <div className="col">
              <Link to="/add-education">Edit education</Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Education education={profile.education} />
            </div>
          </div>
        </div>
      </div>
      // <div class="container">
      //   <img width="50" height="80" src={img} alt="Helpful alt text" />
      // </div>
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
