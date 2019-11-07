import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { get_admins } from "../../actions/AdminActions/AdminAction";
import Spinner from "../Common/Spinner";
import { withRouter } from "react-router-dom";
class AllAdmins extends Component {
  constructor() {
    super();

    this.state = {
      id: ""
    };
    this.onClick = this.onClick.bind(this);
    //this.onChange=this.onChange.bind(this);
  }

  onClick(id) {
    //e.preventDefault();
    console.log(id);
    const userid = {
      id: id
    };
    axios
      .delete(`http://localhost:5000/api/admin/delete-admin/${id}`)
      .then(res => {
        console.log(res.data);
        this.props.history.push("/admin/all-admins");
      })
      .catch();
  }
  componentWillMount() {
    this.props.get_admins();
  }
  render() {
    const { admins, loading, admin } = this.props.admin;
    console.log(admins);
    console.log(typeof admins);
    let adminItems;
    if (admins == null || loading) {
      adminItems = <Spinner />;
    } else if (admin.isSuper) {
      //maping array inside a object
      adminItems = Object.keys(admins).map((keyName, i) => (
        // <li className="travelcompany-input" key={i}>
        //     <span className="input-label">key: {i} Name: {subjects[keyName]}</span>
        // </li>

        <tr key={i}>
          <td>{admins[keyName].name}</td>
          <td>{admins[keyName].email}</td>
          <td>{admins[keyName].phone}</td>
          <td>
            <button
              onClick={() => this.onClick(admins[keyName]._id)}
              name="id"
              value={admins[keyName]._id}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      //maping array inside a object
      adminItems = Object.keys(admins).map((keyName, i) => (
        <tr key={i}>
          <td>{admins[keyName].name}</td>
          <td>{admins[keyName].email}</td>
          <td>{admins[keyName].phone}</td>
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
)(withRouter(AllAdmins));
