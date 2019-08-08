import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Education from "./Education";
import { Link } from "react-router-dom";

class DashboardProfile extends Component {
  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    return (
      <div className="col">
        <div className="row">
          <div className="col offset-md-0">
            {/* <img
          style="width: 120px;height: 120px;"
          //src='"https://www.w3schools.com/images/w3schools_green.jpg"'
        /> */}
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
          <div className="col">
            <h2>Tution info:</h2>
            <div>Expected salary:</div>
            <div>Days per week:</div>
            <div>Preffered subject:</div>
            <div>Preffered className:</div>
            <div>Custom Code:</div>
            <div>Custom Code</div>
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
        <Education education={profile.education} />
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
