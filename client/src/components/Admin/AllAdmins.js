import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { get_admins } from "../../actions/AdminActions/AdminAction";
import Spinner from "../Common/Spinner";
class AllAdmins extends Component {
  componentWillMount() {
    this.props.get_admins();
  }
  render() {
    const { admins, loading } = this.props.admin;
    console.log(admins);
    let adminItems;
    if (admins == null || loading) {
      adminItems = <Spinner />;
    } else {
      adminItems = Object.keys(admins).map((keyName, i) => (
        // <li className="travelcompany-input" key={i}>
        //     <span className="input-label">key: {i} Name: {subjects[keyName]}</span>
        // </li>

        <tr key={i}>
          <td>{admins[keyName]._id}</td>
          <td>{admins[keyName].name}</td>
          <td>{admins[keyName].email}</td>
          <td>{admins[keyName].phone}</td>
          <td>
            <Link to="#" className="btn btn-sm btn-warning mr-2">
              Edit
            </Link>
            <Link to="#" className="btn btn-sm btn-danger">
              Delete
            </Link>
          </td>
        </tr>
      ));
    }
    return (
      <div>
        <div className="container">
          <div className="alert alert-secondary text-center">All Admins</div>
          <table className="table table-bordered ">
            <thead className="bg-dark text-center">
              <tr className="text-white">
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{adminItems}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
AllAdmins.propTypes = {
  get_admins: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(
  mapStateToProps,
  { get_admins }
)(AllAdmins);
