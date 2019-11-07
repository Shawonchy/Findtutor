import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { get_users } from "../../actions/AdminActions/AdminAction";
import Spinner from "../Common/Spinner";
class AllUsers extends Component {
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
    this.props.get_users();
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
    const { users, loading } = this.props.admin;
    console.log(users);
    let userItems;
    if (users == null || loading) {
      userItems = <Spinner />;
    } else {
      userItems = Object.keys(users).map((keyName, i) => (
        <tr key={i}>
          {/* <td>{users[keyName]._id}</td> */}
          <td>{users[keyName].name}</td>
          <td>{users[keyName].email}</td>
          <td>{users[keyName].phone}</td>
          <td>
            {/* <Link to="#" className="btn btn-sm btn-warning mr-2">
              Edit
            </Link> */}
            <button
              onClick={() => this.onClick(users[keyName]._id)}
              name="id"
              value={users[keyName]._id}
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
          <div className="alert alert-secondary text-center">All Users</div>
          <table className="table table-bordered ">
            <thead className="bg-dark text-center">
              <tr className="text-white">
                {/* <th>Id</th> */}
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{userItems}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
AllUsers.propTypes = {
  get_users: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(
  mapStateToProps,
  { get_users }
)(AllUsers);
