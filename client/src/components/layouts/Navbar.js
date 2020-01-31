import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/AuthAction";
import { clearCurrentProfile } from "../../actions/ProfileAction";
import Sidebar from "../Admin/Sidebar";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const adminisAuthenticated = this.props.admin.isAuthenticated;
    //for logged in authenticated user
    const authlink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    );

    //for guest user
    const guestlink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    let navbar;
    if (adminisAuthenticated) {
      navbar = <Sidebar />;
    } else {
      navbar = (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-0">
          <div className="container">
            <Link className="navbar-brand" to="/">
              FindTutor
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    {" "}
                    Tutors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ask_for_a_tutor">
                    {" "}
                    Request A Tutor
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/all_tutions">
                    {" "}
                    Tutions
                  </Link>
                </li>
              </ul>
              {/* if authenticated then authlink otherwise guestlink (ternary operator*/}
              {isAuthenticated ? authlink : guestlink}
            </div>
          </div>
        </nav>
      );
    }

    // //for logged in authenticated user
    // const authlink = (
    //   <ul className="navbar-nav ml-auto">
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/dashboard">
    //         Dashboard
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <a
    //         href=""
    //         onClick={this.onLogoutClick.bind(this)}
    //         className="nav-link"
    //       >
    //         <img
    //           className="rounded-circle"
    //           src={user.avatar}
    //           alt={user.name}
    //           style={{ width: "25px", marginRight: "5px" }}
    //           title="You must have a Gravatar connected to your email to display an image"
    //         />{" "}
    //         Logout
    //       </a>
    //     </li>
    //   </ul>
    // );

    // //for guest user
    // const guestlink = (
    //   <ul className="navbar-nav ml-auto">
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/register">
    //         Sign Up
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/login">
    //         Login
    //       </Link>
    //     </li>
    //   </ul>
    // );

    return (
      // <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      //   <div className="container">
      //     <Link className="navbar-brand" to="/">
      //       FindTutor
      //     </Link>
      //     <button
      //       className="navbar-toggler"
      //       type="button"
      //       data-toggle="collapse"
      //       data-target="#mobile-nav"
      //     >
      //       <span className="navbar-toggler-icon" />
      //     </button>

      //     <div className="collapse navbar-collapse" id="mobile-nav">
      //       <ul className="navbar-nav mr-auto">
      //         <li className="nav-item">
      //           <Link className="nav-link" to="/profiles">
      //             {" "}
      //             Tutors
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link className="nav-link" to="/search-tutors">
      //             {" "}
      //             Search Tutors
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link className="nav-link" to="/ask_for_a_tutor">
      //             {" "}
      //             Request A Tutor
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link className="nav-link" to="/all_tutions">
      //             {" "}
      //             Tutions
      //           </Link>
      //         </li>
      //       </ul>
      //       {/* if authenticated then authlink otherwise guestlink (ternary operator*/}
      //       {isAuthenticated ? authlink : guestlink}
      //     </div>
      //   </div>
      // </nav>
      <div>{navbar}</div>
    );
  }
}
//defining properties type
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired
};

//connect state from store to component as props(property)
const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
});

//connecting properties and state to component
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
