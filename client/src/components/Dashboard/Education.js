import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment"; //for formating date

class Education extends Component {
  render() {
    // mapping to education array and taking each arry index as edu
    const education = this.props.education.map(edu => (
      <tr key={edu.id}>
        <td>{edu.institute}</td>
        <td>{edu.degree}</td>
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

      <div className="row">
        <div className="col">
          <h2>Educational Qualification:</h2>
          <div className="datagrid">
            <table className="table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Institute</th>
                  <th>Column 2</th>
                  <th>Column 4</th>
                </tr>
                {education}
              </thead>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null)(withRouter(Education));
