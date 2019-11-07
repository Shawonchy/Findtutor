import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getProfiles } from "../../actions/ProfileAction";
import Spinner from "../Common/Spinner";
class TutorProfiles extends Component {
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

  componentDidMount() {
    this.props.getProfiles();
  }
  //   onClick(id) {
  //     //e.preventDefault();
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
    const { profiles, loading } = this.props.profile;
    console.log(profiles);
    let profilesItems;
    if (profiles == null || loading) {
      profilesItems = <Spinner />;
    } else {
      profilesItems = Object.keys(profiles).map((keyName, i) => (
        <tr key={i}>
          <td>{profiles[keyName]._id}</td>
          <td>{profiles[keyName].handle}</td>
          <td>{profiles[keyName].division}</td>
          <td>{profiles[keyName].district}</td>
          <td>{profiles[keyName].upazila}</td>
          <td>{profiles[keyName].expert}</td>
          <td>{profiles[keyName].experience}</td>
          <td>{profiles[keyName].gender}</td>
          {/* <td>{profiles[keyName].education}</td>
          <td>{profiles[keyName].tution_info}</td>
          <td>{profiles[keyName].skills}</td>
          <td>{profiles[keyName].user}</td> */}
          {/* <td>
              <Link to="#" className="btn btn-sm btn-warning mr-2">
                Edit
              </Link>
              <button
                onClick={() => this.onClick(profiles[keyName]._id)}
                name="id"
                value={profiles[keyName]._id}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </td> */}
        </tr>
      ));
    }
    return (
      <div>
        <div className="container">
          <div className="alert alert-secondary text-center mr-5">
            All profiles
          </div>
          <table className="table table-bordered ">
            <thead className="bg-dark text-center">
              <tr className="text-white">
                <th>Id</th>
                <th>Handle</th>
                <th>Division</th>
                <th>District</th>
                <th>Upazila</th>
                <th>Expert</th>
                <th>Experience</th>
                <th>Gender</th>
                <th>Education</th>
                <th>Tution Info</th>
                <th>Image</th>
                <th>Skills</th>
                <th>User_id</th>
              </tr>
            </thead>
            <tbody>{profilesItems}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
TutorProfiles.propTypes = {
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(TutorProfiles);
