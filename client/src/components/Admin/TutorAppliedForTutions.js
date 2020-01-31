import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
var appliedtutions;
class TutorAppliedForTutions extends Component {
  constructor() {
    super();
    this.state = {
      appliedtutions: [],
      tutorSelected: "",
      tution_data: "",
      SeletedTutorUserId: ""
    };
    //this.onClick = this.onClick.bind(this);
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

    console.log(this.props.match.params.id);
    console.log(this.state.tutorSelected);
    //console.log(assignedTutorInfo);
  }

  componentWillMount() {
    axios
      .get("http://localhost:5000/api/applytution/all-applied-tutions")
      .then(res => {
        console.log(res.data);
        this.setState({ appliedtutions: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const appliedtutions = this.state.appliedtutions;
    console.log(appliedtutions);
    let appliedtutionsitems;
    if (appliedtutions == null) {
      appliedtutionsitems = "No tutions have been applied";
    } else {
      appliedtutionsitems = appliedtutions.map(keyname => (
        <tr key={keyname._id}>
          {/* <td>{keyname._id}</td> */}
          <td>
            <Link to={`/admin/get-tution-id/${keyname.tution._id}`}>
              {keyname.tution.title}
            </Link>
          </td>
          <td>
            {keyname.tutor.map((
              tutor //map through the tutors array
            ) => (
              <li>
                <Link to={`/admin/tutor-profile/${tutor.handle}`}>
                  {tutor.handle}
                </Link>
              </li>
            ))}
          </td>
          <td>{keyname.tutor.length}</td>

          <td>
            {/*maping array inside a object and dynamic select options */}
            <select
              name="tutorSelected"
              value={this.state.tutorSelected}
              onChange={this.onChange}
            >
              {keyname.tutor.map(tutor => (
                <option value={tutor._id}>{tutor.handle}</option>
              ))}
            </select>
          </td>

          <td>
            <button
              //onClick={() => this.onClick()}
              name="id"
              value=""
              className="btn btn-sm btn-danger"
            >
              Assign
            </button>
          </td>
        </tr>
      ));
    }

    return (
      <div>
        <div className="container">
          <div className="alert alert-secondary text-center mr-5">
            Tutions Applied By The Tutors
          </div>
          <table className="table table-bordered ">
            <thead className="bg-dark text-center">
              <tr className="text-white">
                {/* <th>Id</th> */}
                <th>Tution</th>
                <th>Tutor</th>
                <th>Number of Tutor Applied</th>
                <th>Assign Tutor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{appliedtutionsitems}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default TutorAppliedForTutions;
