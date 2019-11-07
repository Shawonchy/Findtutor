import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../Common/Spinner";
import { getTutionById } from "../../actions/TutionAction";
import PropTypes from "prop-types";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { getispremium } from "../../actions/AuthAction";
import StripeCheckOut from "react-stripe-checkout";

class Tution extends Component {
  constructor() {
    super();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.handleToken = this.handleToken.bind(this);
  }
  //this lifecycle method executed after render
  componentDidMount() {
    //this property is handle from the urls handle
    if (this.props.match.params.id) {
      this.props.getTutionById(this.props.match.params.id);
    }
  }
  //this lifecycle method is executed before render
  componentWillMount() {
    this.props.getispremium();
  }
  // onClickHandler() {
  //   axios
  //     .get("http://localhost:5000/checkout.php")
  //     .then(res => {
  //       console.log(res.data);
  //       //this.props.history.push("https://www.facebook.com");
  //       //redirecting to external website
  //       window.location.assign(res.data);
  //     })
  //     .catch(err => console.log(err));
  // }

  //for handleing stripes payment token contains all info of transection
  handleToken(token) {
    const { _id } = this.props.auth.user;
    console.log(_id);
    const userinfo = {
      id: _id,
      price: "120.0"
    };
    axios
      .post("http://localhost:5000/api/users/update-tutor-type", {
        token,
        userinfo
      })
      .then(res => {
        console.log(res.data);
        const { status } = res.data;
        if (status === "success") {
          console.log(status);
        } else {
          console.log("error");
        }
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  onClickHandler() {
    const applydata = {
      tution: this.props.tution.tution,
      profile: this.props.profile.profile
    };
    console.log(applydata);
    axios
      .post("http://localhost:5000/api/applytution/", applydata)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  render() {
    const { tution, loading } = this.props.tution;
    const { user, isAuthenticated } = this.props.auth;
    const { profile } = this.props.profile;

    console.log(user);
    // console.log(tution);
    // console.log(tution.mobile);

    // console.log({tution.});
    let tutionContent;
    if (tution === null || loading) {
      tutionContent = <Spinner />;
    } else {
      console.log(user.ispremium);
      //console.log(user);

      // tution.address = user.ispremium
      //   ? tution.address
      //   : "to see address become a premium member";
      // tution.mobile = user.ispremium
      //   ? tution.mobile
      //   : "to see mobile become a premium member";

      if (!user.ispremium) {
        tution.address = "to see address become a premium member";
        tution.mobile = "to see mobile become a premium member";
      }
      let stripePayment;

      if (isAuthenticated && !user.ispremium) {
        stripePayment = (
          <div>
            <div className="alert alert-success p-2">
              <h6 className="mb-2">
                To apply for this tution pay 200tk and become a premium member
              </h6>
            </div>
            <StripeCheckOut
              stripeKey="pk_test_RKLWJ7vbzP4LfxzkEgKA1Hly00Z61MJBFV"
              token={this.handleToken}
            />
          </div>
        );
      }
      //apply for tution
      let isApply;
      if (isAuthenticated && user.ispremium) {
        isApply = (
          <div>
            <button
              onClick={this.onClickHandler}
              className="btn btn-primary btn-sm"
            >
              apply
            </button>
          </div>
        );
      }

      let islogedin;
      if (!isAuthenticated) {
        islogedin = (
          <div className="row text-left bg-warning">
            <p className="alert error">
              <Link to="/login">Login </Link>
              and become a premium member to apply for this tution ' '
              <Link to="/register">Signup </Link>
              to register
            </p>
          </div>
        );
      }

      tutionContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/all_tutions" className="btn btn-light mb-3 float-left">
                Back to tutions
              </Link>
            </div>
          </div>
          <h2 className="mb-0">
            {
              /* {(tution.title = typeof tution.title == "null" ? tution.title : "")} */
              tution.title
            }
          </h2>
          <div className="mb-3 text-muted" style={{ fontSize: "14px" }}>
            Posted on {tution.posted_at}
          </div>
          <p>{tution.instruction}</p>
          <div className="row">
            <div class="col mb-3">
              <div class="alert alert-info p-2">Student Informations</div>
              <table class="table table-bordered">
                <tr>
                  <th className="bg-light" style={{ width: "30%" }}>
                    Name
                  </th>
                  <td>{tution.name}</td>
                </tr>
                <tr>
                  <th className="bg-light">Mobile</th>
                  <td>{tution.mobile}</td>
                </tr>
                <tr>
                  <th className="bg-light">Location</th>
                  <td>{tution.district}</td>
                </tr>
                <tr>
                  <th className="bg-light">Address</th>
                  <td>{tution.address}</td>
                </tr>
                <tr>
                  <th className="bg-light">Student Gender</th>
                  <td>{tution.studentgender}</td>
                </tr>
                <tr>
                  <th className="bg-light">institute</th>
                  <td>{tution.institute}</td>
                </tr>
                <tr>
                  <th className="bg-light">Class</th>
                  <td>{tution.class}</td>
                </tr>
                <tr>
                  <th className="bg-light">Medium</th>
                  <td>{tution.medium}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col mb-3">
              <div className="alert alert-info p-2">
                Desired Tutors Informations
              </div>
              <table class="table table-bordered">
                <tr>
                  <th className="bg-light" style={{ width: "30%" }}>
                    Gender
                  </th>
                  <td>{tution.tutorgender}</td>
                </tr>
                <tr>
                  <th className="bg-light">Days per week</th>
                  <td>{tution.daysperweek}</td>
                </tr>
                <tr>
                  <th className="bg-light">Salaryrange</th>
                  <td>{tution.salaryrange}</td>
                </tr>
                <tr>
                  <th className="bg-light">Subject</th>
                  <td>{(tution.subject = tution.subject.toString())}</td>
                </tr>
              </table>
            </div>
          </div>
          {stripePayment}
          {islogedin}
          {isApply}

          {/* <div className="row">
            <div className="col-md-6">Full name: {tution.name}</div>
            <div className="col-md-6">Location: {tution.location}</div>
          </div>

          <div className="row">
            <div className="col-md-6">
              Student Gender: {tution.studentgender}
            </div>
            <div className="col-md-6">
              Desired Tutor Gender: {tution.tutorgender}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">Class: {tution.class}</div>
            <div className="col-md-6">Subject: {tution.subject}</div>
          </div>

          <div className="row">
            <div className="col-md-6">Days: {tution.daysperweek}</div>
            <div className="col-md-6">Salary Range: {tution.salaryrange}</div>
          </div>

          <div className="row">
            <div className="col-md-6">Address: {tution.address}</div>
            <div className="col-md-6">Email: {tution.email}</div>
          </div>

          <div className="row">
            <div className="col-md-6">Mobile: {tution.mobile}</div>
            <div className="col-md-6">Posted on::</div>
          </div> */}

          {/* <div className="border rounded p-4 bg-light">
            <h4 className="mb-1">Teacher needed for class 5</h4>
            <div className="text-muted mb-3" style={{ fontSize: "12px" }}>
              Posted on 5, Aug 2019
            </div>
            <div class="row">
              <div className="alert alert-success p-2">
                <h6 className="mb-0">Student Informations</h6>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-6">
                <table
                  className="table table-borderless table-sm"
                  style={{ fontSize: "14px" }}
                >
                  <tr>
                    <th className="pl-0 py-1" style={{ width: "65px" }}>
                      Name:
                    </th>
                    <td className="py-1">{tution.name}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1" style={{ width: "65px" }}>
                      Class:
                    </th>
                    <td className="py-1">{tution.class}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1">Medium:</th>
                    <td className="py-1">{tution.medium}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1">Location:</th>
                    <td className="py-1">{tution.district}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1">Address:</th>
                    <td className="py-1">{tution.address}</td>
                  </tr>
                </table>
              </div>
              <div className="col-6">
                <table
                  className="table table-borderless table-sm"
                  style={{ fontSize: "14px" }}
                >
                  <tr>
                    <th className="pl-0 py-1" style={{ width: "100px" }}>
                      Salary:
                    </th>
                    <td className="py-1">{tution.salaryrange}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1">Subjects:</th>
                    <td className="py-1">{tution.subject1}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1">Gender:</th>
                    <td className="py-1">{tution.studentgender}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1">Institute:</th>
                    <td className="py-1">{tution.institute}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1">Mobile:</th>
                    <td className="py-1">{tution.mobile}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div className="border rounded p-4 bg-light">
            <div class="row">
              <div className="alert alert-success p-2">
                <h6 className="mb-0">Desired Tutor Info</h6>
              </div>
            </div>
            <div className="row no-gutters">
              <div class="col-6">
                <table
                  className="table table-borderless table-sm"
                  style={{ fontSize: "14px" }}
                >
                  <tr>
                    <th className="pl-0 py-1" style={{ width: "65px" }}>
                      Gender:
                    </th>
                    <td className="py-1">{tution.tutorgender}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1" style={{ width: "65px" }}>
                      Days per week:
                    </th>
                    <td className="py-1">{tution.daysperweek}</td>
                  </tr>
                </table>
              </div>
              <div class="col-6">
                <table
                  className="table table-borderless table-sm"
                  style={{ fontSize: "14px" }}
                >
                  <tr>
                    <th className="pl-0 py-1" style={{ width: "65px" }}>
                      Salary range:
                    </th>
                    <td className="py-1">{tution.salaryrange}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1" style={{ width: "65px" }}>
                      Subject:
                    </th>
                    <td className="py-1">{tution.subject1}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div className="row">
            <StripeCheckOut
              stripeKey="pk_test_RKLWJ7vbzP4LfxzkEgKA1Hly00Z61MJBFV"
              token={this.handleToken}
            />
          </div>
         */}
        </div>
      );
    }

    return (
      <div className="tution">
        <div className="container">
          <div className="row">
            <div className="col-md-8">{tutionContent}</div>
            <div className="col-md-4 pt-4">
              <div class="bg-dark text-white py-2 px-3 rounded mb-3">
                <h5>Other tutions in this area</h5>
              </div>

              <div class="border p-3 mb-3 rounded mb-2">
                <h5>I need a teacher for English</h5>
                <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                  Class: Iv
                </p>
              </div>

              <div class="border p-3 mb-3 rounded mb-2">
                <h5>I need a teacher for English</h5>
                <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                  Class: Iv
                </p>
              </div>

              <div class="border p-3 mb-3 rounded mb-2">
                <h5>I need a teacher for English</h5>
                <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                  Class: Iv
                </p>
              </div>

              <div class="border p-3 mb-3 rounded mb-2">
                <h5>I need a teacher for English</h5>
                <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                  Class: Iv
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Tution.propTypes = {
  getTutionById: PropTypes.func.isRequired,
  getispremium: PropTypes.func.isRequired,
  tution: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tution: state.tution,
  auth: state.auth,
  profile: state.profile
});

export default withRouter(
  connect(
    mapStateToProps,
    { getTutionById, getispremium }
  )(Tution)
);
