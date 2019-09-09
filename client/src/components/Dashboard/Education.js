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
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="bg-light">Exam</th>
            <th className="bg-light">Institute</th>
            <th className="bg-light">Group</th>
            <th className="bg-light">Year</th>
          </tr>
          {education}
        </thead>
      </table>

      //     </div>
      //   </div>
      // </div>
    );
  }
}
export default connect(null)(withRouter(Education));
