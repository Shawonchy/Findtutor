import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import $ from "jquery";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import SelectListGroup from "../Common/SelectListGroup";
import {
  getTutionById,
  getTutorsAppliedForTution
} from "../../actions/TutionAction.js";
import Spinner from "../Common/Spinner";
class TutionById extends Component {
  constructor() {
    super();

    this.state = {
      tutorSelected: "",
      tution_data: "",
      SeletedTutorUserId: ""
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClick() {
    Object.keys(this.state.tution_data).map((keyname, i) => {
      if (this.state.tution_data[keyname]._id == this.state.tutorSelected) {
        let assignedTutorInfo = {
          tution_id: this.props.match.params.id,
          profile_id: this.state.tutorSelected,
          SeletedTutorUserId: this.state.tution_data[keyname].user
        };
        console.log(assignedTutorInfo);
        axios
          .post(
            "http://localhost:5000/api/admin/assign-tutor",
            assignedTutorInfo
          )
          .then(res => {
            console.log(res.data);
            this.props.history.push("/admin/dashboard");
          })
          .catch(err => console.log(err));
      }
    });

    // console.log(this.props.match.params.id);
    // console.log(this.state.tutorSelected);
    // console.log(assignedTutorInfo);
  }
  componentWillMount() {
    this.props.getTutionById(this.props.match.params.id);
    const tution_id = {
      tution_id: this.props.match.params.id
    };
    axios
      .post(
        "http://localhost:5000/api/applytution/tutors-applied-foratution",
        tution_id
      )
      .then(res => {
        this.setState({ tution_data: res.data });
        //console.log(typeof this.state.tution_data);
      })
      .catch();

    //this.props.getTutorsAppliedForTution(tution_id);
  }
  componentDidMount() {}

  render() {
    const { tution, loading } = this.props.tution;

    console.log(this.state.tution_data);
    console.log(typeof this.state.tution_data);
    //console.log(tutorappliedfortution);
    let tutionItems;
    if (tution == null || loading) {
      tutionItems = <Spinner />;
    } else {
      tutionItems = (
        <tr>
          <td>{tution.name}</td>
          <td>{tution.email}</td>
          <td>{tution.location}</td>
          <td>{tution.medium}</td>
          <td>{tution.class}</td>
          <td>{tution.subject}</td>
          <td>{tution.institute}</td>
          <td>{tution.daysperweek}</td>
          <td>{tution.studentgender}</td>
          <td>{tution.salaryrange}</td>
          <td>{tution.tutorgender}</td>
          <td>{tution.address}</td>
          <td>{tution.mobile}</td>
          <td>{tution.posted_at}</td>

          <td>
            {/*maping array inside a object and dynamic select options */}
            <select
              name="tutorSelected"
              value={this.state.tutorSelected}
              onChange={this.onChange}
            >
              {Object.keys(this.state.tution_data).map((keyname, i) => (
                <option key={i} value={this.state.tution_data[keyname]._id}>
                  {this.state.tution_data[keyname].handle}
                </option>
              ))}
            </select>
          </td>

          <td>
            <button
              onClick={() => this.onClick()}
              name="id"
              value=""
              className="btn btn-sm btn-danger"
            >
              Assign
            </button>
          </td>
        </tr>
      );
    }
    return (
      <div>
        <div className="container">
          <div className="alert alert-secondary text-center mr-5">
            All tution
          </div>
          <table className="table table-bordered ">
            <thead className="bg-dark text-center">
              <tr className="text-white">
                <th>Name</th>
                <th>email</th>
                <th>Location</th>
                <th>Medium</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Institute</th>
                <th>Days Per Week</th>
                <th>Student Gender</th>
                <th>Salary Range</th>
                <th>Tutor Gender</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>Posted At</th>
                <th>Assign tutor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{tutionItems}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
TutionById.propTypes = {
  getTutionById: PropTypes.func.isRequired,
  getTutorsAppliedForTution: PropTypes.func.isRequired,
  tution: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tution: state.tution
});

export default connect(
  mapStateToProps,
  { getTutionById, getTutorsAppliedForTution }
)(withRouter(TutionById));
