import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getTutions } from "../../actions/TutionAction.js";
import Spinner from "../Common/Spinner";
class AllTutions extends Component {
  constructor() {
    super();

    this.state = {
      id: ""
    };
    this.onClick = this.onClick.bind(this);
    //this.onChange=this.onChange.bind(this);
  }
  // onChange(id){
  //   this.setState({id:id})
  // }

  componentWillMount() {
    this.props.getTutions();
  }
  onClick(id) {
    //e.preventDefault();
    console.log(id);
    const userid = {
      id: id
    };
    axios
      .delete(`http://localhost:5000/api/users/delete-user/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch();
  }
  render() {
    const { tutions, loading } = this.props.tution;
    console.log(tutions);
    let tutionItems;
    if (tutions == null || loading) {
      tutionItems = <Spinner />;
    } else {
      tutionItems = Object.keys(tutions).map((keyName, i) => (
        <tr key={i}>
          <td>{tutions[keyName]._id}</td>
          <td>{tutions[keyName].name}</td>
          <td>{tutions[keyName].location}</td>
          <td>{tutions[keyName].medium}</td>
          <td>{tutions[keyName].class}</td>
          <td>{tutions[keyName].subject}</td>
          <td>{tutions[keyName].institute}</td>
          <td>{tutions[keyName].daysperweek}</td>
          <td>{tutions[keyName].studentgender}</td>
          <td>{tutions[keyName].salaryrange}</td>
          <td>{tutions[keyName].tutorgender}</td>
          <td>{tutions[keyName].address}</td>
          <td>{tutions[keyName].mobile}</td>
          <td>{tutions[keyName].email}</td>
          <td>{tutions[keyName].isActive}</td>
          <td>{tutions[keyName].posted_at}</td>
          <td>
            <Link to="#" className="btn btn-sm btn-warning mr-2">
              Edit
            </Link>
            <button
              onClick={() => this.onClick(tutions[keyName]._id)}
              name="id"
              value={tutions[keyName]._id}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    }
    return (
      <div>
        <div className="container">
          <div className="alert alert-secondary text-center mr-5">
            All tutions
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
AllTutions.propTypes = {
  getTutions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tution: state.tution
});

export default connect(
  mapStateToProps,
  { getTutions }
)(AllTutions);
