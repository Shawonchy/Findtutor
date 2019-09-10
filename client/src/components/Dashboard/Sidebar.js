import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
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
                <Link to="/myprofile" className="nav-link">
                  <i className="fa fa-pencil" aria-hidden="true" /> My profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/uploadphoto" href="#" className="nav-link">
                  <i className="fa fa-pencil" aria-hidden="true" /> My photo
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/myapplications" className="nav-link">
                  <i className="fa fa-pencil" aria-hidden="true" /> My
                  Applications
                </Link>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="fa fa-pencil" aria-hidden="true" /> My Current
                  Student/Tutions
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
    );
  }
}
export default Sidebar;
