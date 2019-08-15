import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../Common/Spinner";
import { getTutionById } from "../../actions/TutionAction";
import { PropTypes } from "prop-types";

class Tution extends Component {
  componentDidMount() {
    //this property is handle from the urls handle
    if (this.props.match.params.id) {
      this.props.getTutionById(this.props.match.params.id);
    }
  }

  render() {
    const { tution, loading } = this.props.tution;
    let tutionContent;
    if (tution === null || loading) {
      tutionContent = <Spinner />;
    } else {
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
            <div className="col-md-6">Mobile: {tution.email}</div>
            <div className="col-md-6">Posted on::</div>
          </div>
        </div>
      );
    }

    return (
      <div className="tution">
        <div className="container">
          <div className="row">
            <div className="col-md-8">{tutionContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
Tution.propTypes = {
  getTutionById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tution: state.tution
});

export default connect(
  mapStateToProps,
  { getTutionById }
)(Tution);
