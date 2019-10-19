import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getTutionById } from "../../actions/TutionAction.js";
import Spinner from "../Common/Spinner";
class TutionById extends Component {
  //   constructor() {
  //     super();

  //     this.state = {
  //       id: ""
  //     };
  //     this.onClick = this.onClick.bind(this);
  //     //this.onChange=this.onChange.bind(this);
  //   }
  // onChange(id){
  //   this.setState({id:id})
  // }

  componentWillMount() {
    this.props.getTutionById(this.props.match.params.id);
  }
  //   onClick(id) {
  //     e.preventDefault();
  //     console.log(id);
  //     const userid = {
  //       id: id
  //     };
  //     axios
  //       .delete(`http://localhost:5000/api/users/delete-user/${id}`)
  //       .then(res => {
  //         console.log(res.data);
  //       })
  //       .catch();
  //   }
  render() {
    const { tution, loading } = this.props.tution;
    console.log(tution);
    let tutionItems;
    if (tution == null || loading) {
      tutionItems = <Spinner />;
    } else {
      tutionItems = (
        <tr>
          <td>{tution._id}</td>
          <td>{tution.name}</td>
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
          <td>{tution.email}</td>
          <td>{tution.isActive}</td>
          <td>{tution.posted_at}</td>
          {/* <td>
            <Link to="#" className="btn btn-sm btn-warning mr-2">
              Edit
            </Link>
            <button
              onClick={() => this.onClick(tution._id)}
              name="id"
              value={tution[keyName]._id}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </td> */}
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
                <th>Id</th>
                <th>Name</th>
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
                <th>Email</th>
                <th>Is Active</th>
                <th>Posted At</th>
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
  tution: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tution: state.tution
});

export default connect(
  mapStateToProps,
  { getTutionById }
)(TutionById);
