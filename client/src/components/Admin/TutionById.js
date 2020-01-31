import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getTutionById } from "../../actions/TutionAction";
import { withRouter } from "react-router-dom";
import Spinner from "../Common/Spinner";
class TutionById extends Component {
  componentDidMount() {
    //this property is handle from the urls handle
    if (this.props.match.params.id) {
      this.props.getTutionById(this.props.match.params.id);
    }
  }

  render() {
    const { tution, loading } = this.props.tution;
    let tutioncontent;
    if (tution == null || loading) {
      tutioncontent = Spinner;
    } else {
      tutioncontent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link
                to="/admin/applied-tutions"
                className="btn btn-light mb-3 float-left"
              >
                Back to applied tutions
              </Link>
            </div>
          </div>
          <h2 className="mb-0">
            {
              /* {(tution.title = typeof tution.title == "null" ? tution.title : "")} */
              tution.title
            }
          </h2>
          <div className="mb-3 text-muted" style={{ fontSize: "14px" }}>
            Posted on {tution.posted_at}
          </div>
          <p>{tution.instruction}</p>
          <div className="row">
            <div class="col mb-3">
              <div class="alert alert-info p-2">Student Informations</div>
              <table class="table table-bordered">
                <tr>
                  <th className="bg-light" style={{ width: "30%" }}>
                    Name
                  </th>
                  <td>{tution.name}</td>
                </tr>
                <tr>
                  <th className="bg-light">Mobile</th>
                  <td>{tution.mobile}</td>
                </tr>
                <tr>
                  <th className="bg-light">Location</th>
                  <td>{tution.district}</td>
                </tr>
                <tr>
                  <th className="bg-light">Address</th>
                  <td>{tution.address}</td>
                </tr>
                <tr>
                  <th className="bg-light">Student Gender</th>
                  <td>{tution.studentgender}</td>
                </tr>
                <tr>
                  <th className="bg-light">institute</th>
                  <td>{tution.institute}</td>
                </tr>
                <tr>
                  <th className="bg-light">Class</th>
                  <td>{tution.class}</td>
                </tr>
                <tr>
                  <th className="bg-light">Medium</th>
                  <td>{tution.medium}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="row">
            <div className="col mb-3">
              <div className="alert alert-info p-2">
                Desired Tutors Informations
              </div>
              <table class="table table-bordered">
                <tr>
                  <th className="bg-light" style={{ width: "30%" }}>
                    Gender
                  </th>
                  <td>{tution.tutorgender}</td>
                </tr>
                <tr>
                  <th className="bg-light">Days per week</th>
                  <td>{tution.daysperweek}</td>
                </tr>
                <tr>
                  <th className="bg-light">Salaryrange</th>
                  <td>{tution.salaryrange}</td>
                </tr>
                <tr>
                  <th className="bg-light">Subject</th>
                  <td>{(tution.subject = tution.subject.toString())}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="tution">
        <div className="container">
          <div className="row">
            <div className="col">{tutioncontent}</div>
          </div>
        </div>
      </div>
    );
  }
}

TutionById.propTypes = {
  tution: PropTypes.object.isRequired,
  getTutionById: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  tution: state.tution
});
export default connect(mapStateToProps, { getTutionById })(
  withRouter(TutionById)
);
