import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Route, Redirect, withRouter } from "react-router-dom";
import AllAdmins from "./AllAdmins";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutAdmin } from "../../actions/AdminActions/AuthAdminAction";
class Sidebar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    console.log("clicked");
    this.props.logoutAdmin(this.props.history);
    //return <Rediret exact to="/admin/login" />;
  }
  render() {
    const { admin } = this.props.admin;

    return (
      <div>
        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#">
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="index3.html" className="nav-link">
                Home
              </a>
            </li>
          </ul>
          {/* SEARCH FORM */}
          <button
            className="btn-danger ml-5"
            onClick={this.onLogoutClick.bind(this)}
          >
            LogOut
          </button>
          {/* Right navbar links */}
        </nav>

        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4 overflow-hidden">
          {/* Brand Logo */}
          <NavLink to="/admin/dashboard" className="brand-link">
            {/* <img
              src="dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            /> */}
            <span className="brand-text font-weight-light">Find Tutor</span>
          </NavLink>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              {/* <div className="image">
                <img
                  src="dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div> */}
              <div className="info">
                <a href="#" className="d-block">
                  {admin.name}
                </a>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                <li className="nav-item has-treeview ">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Admins
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <NavLink to="/admin/all-admins" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>All Admins</p>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/admin/create-admin" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Create Admin</p>
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview ">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Tutors
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <NavLink to="/admin/all-users" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>All Tutors</p>
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview ">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Tutions
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <NavLink to="/admin/all-tutions" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>All Tutions</p>
                      </NavLink>
                    </li>
                  </ul>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <NavLink to="/admin/applied-tutions" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Tutions Applied By Tutors</p>
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview ">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Profiles
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <NavLink to="/admin/tutor-profiles" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>All Profiles</p>
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>

        {/* /.navbar */}
      </div>
    );
  }
}
Sidebar.propTypes = {
  logoutAdmin: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  admin: state.admin
});
export default connect(mapStateToProps, { logoutAdmin })(withRouter(Sidebar));
