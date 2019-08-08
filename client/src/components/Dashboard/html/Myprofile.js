import React, { Component } from "react";
import "./assets/css/Pretty-Table-1.css";
import "./assets/css/Sidebar-1.css";
import "./assets/css/styles.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Education from "../Education";
class Dashboardlayout extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="row">
              <div className="col offset-md-0">
                {/* <img
                  style="width: 120px;height: 120px;"
                  //src='"https://www.w3schools.com/images/w3schools_green.jpg"'
                /> */}
              </div>
              <div className="col">
                <h2 className="text-left">shawon chy</h2>
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
                </div>
              </div>
            </div> */}
          </div>
          <div className="col">
            <div
              id="sidebar-main"
              className="sidebar sidebar-default sidebar-separate"
            >
              <div className="sidebar-category sidebar-default">
                <div className="category-title">
                  <span>Navigation</span>
                </div>
                <div className="category-content">
                  <ul id="fruits-nav" className="nav flex-column">
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="fa fa-pencil" aria-hidden="true" /> My
                        profile
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="fa fa-pencil" aria-hidden="true" /> My
                        photo
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="fa fa-pencil" aria-hidden="true" />{" "}
                        Personal Information
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="fa fa-pencil" aria-hidden="true" />{" "}
                        Academic Information
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="fa fa-pencil" aria-hidden="true" /> Tution
                        Information
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(Dashboardlayout);
