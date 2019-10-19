import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
var appliedtutions;
class TutorAppliedForTutions extends Component {
  constructor() {
    super();
    this.state = {
      appliedtutions: []
    };
  }
  componentWillMount() {
    axios
      .get("http://localhost:5000/api/applytution/all-applied-tutions")
      .then(res => {
        //console.log(res.data);
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
          <td>{keyname._id}</td>
          <td>
            <Link to={`/admin/get-tution-id/${keyname.tution}`}>
              {keyname.tution}
            </Link>
          </td>
          <td>
            {keyname.tutor.map((
              tutor //map through the tutors array
            ) => (
              <li>{tutor}</li>
            ))}
          </td>
          <td>{keyname.tutor.length}</td>
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
                <th>Id</th>
                <th>Tution</th>
                <th>Tutor</th>
                <th>Number of Tutor Applied</th>
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
