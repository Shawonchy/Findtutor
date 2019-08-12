import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment"; //for formating date
import { Link } from "react-router-dom";

class Education extends Component {
  render() {
    // mapping to education array and taking each arry index as edu
    const education = this.props.education.map(edu => (
      <tr key={edu.id}>
        <td>{edu.degree}</td>
        <td>{edu.institute}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment>-
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        </td>
      </tr>
    ));

    return (
      // <div>
      //   <h4 className="mb-4">Education Credentials</h4>
      //   <table className="table">
      //     <thead>
      //       <tr>
      //         <td>Institute</td>
      //         <td>Degree</td>
      //         <td>Field of study</td>
      //         <td>Year</td>
      //       </tr>
      //       {education}
      //     </thead>
      //   </table>
      // </div>

      // <div className="row">
      //   <div class="row">
      //     <div className="col-md-8">
      //       <h2>Educational Qualification:</h2>
      //     </div>
      //     <div className="col-md-3">
      //       <Link to="/add-education">Edit education info</Link>
      //     </div>
      //   </div>
      // <div class="row">
      //   <div class="col">
      <div className="datagrid">
        <table className="table">
          <thead>
            <tr>
              <th>Exam</th>
              <th>Institute</th>
              <th>Group</th>
              <th>Year</th>
            </tr>
            {education}
          </thead>
        </table>
      </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
export default connect(null)(withRouter(Education));
