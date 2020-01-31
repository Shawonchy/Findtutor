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
      .then(res => {
        console.log(res.data);

        this.props.history.push("/dashboard");
      })
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
          <div className="row text-left ">
            <div className="col">
            <div className="alert error bg-warning">
              <Link to="/login">Login </Link>
              and become a premium member to apply for this tution ' '
              <Link to="/register">Signup </Link>
              to register
            </div>
            </div>
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
        </div>
      );
    }

    return (
      <div className="tution">
        <div className="container">
          <div className="row">
            <div className="col">{tutionContent}</div>
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
  connect(mapStateToProps, { getTutionById, getispremium })(Tution)
);
