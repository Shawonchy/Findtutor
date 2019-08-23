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
class Tution extends Component {
  constructor() {
    super();

    this.onClickHandler = this.onClickHandler.bind(this);
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
  onClickHandler() {
    axios
      .get("http://localhost:5000/checkout.php")
      .then(res => {
        console.log(res.data);
        //this.props.history.push("https://www.facebook.com");
        //redirecting to external website
        window.location.assign(res.data);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { tution, loading } = this.props.tution;
    const { user } = this.props.auth;
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
      }
      if (!user.ispremium) {
        tution.mobile = "to see mobile become a premium member";
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

          <div className="row">
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
          </div>
          <div class="row">
            <button
              type="button"
              class="btn btn-success btn-block"
              onClick={this.onClickHandler}
            >
              PayNow
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* {
          (tution.address = user.ispremium
            ? tution.address
            : "to see address become a premium member")
        }
        {
          (tution.mobile = user.ispremium
            ? tution.mobile
            : "to see mobile become a premium member")
        } */}
        <div className="tution">
          <div className="container">
            <div className="row">
              <div className="col-md-8">{tutionContent}</div>
            </div>
          </div>
        </div>
      </>
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
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { getTutionById, getispremium }
  )(Tution)
);
