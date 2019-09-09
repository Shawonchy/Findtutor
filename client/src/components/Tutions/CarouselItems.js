import React, { Component } from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class CarouselItems extends Component {
  render() {
    const { tution } = this.props;
    return (
      <div class="carousel-item">
        <div className="card">
          {/* <div className="card-header" style={{ background: "green" }}>
            <strong>{tution.location}</strong>
          </div>
          <div className="card-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-5">
                  <strong>Tuition ID #</strong>
                </div>
                <div className="col" />
              </div>

              <div className="row">
                <div className="col-5">
                  <strong>Class/ Subject:</strong>
                </div>
                <div className="col">
                  {" "}
                  <strong>
                    {tution.class},{tution.subject}
                  </strong>{" "}
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <strong>Days per week</strong>
                </div>
                <div className="col">
                  <strong>{tution.daysperweek}</strong>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <strong>Salary Range</strong>
                </div>
                <div className="col">
                  <strong>{tution.salaryrange}</strong>
                </div>
              </div>
              <div className="row">
                <div className="col-md-11" />
                <div className="col">
                  <Link to={`/tution/${tution._id}`}>View details</Link>
                </div>
              </div>
            </div>
          </div> */}

          <div className="border rounded p-4 bg-light">
            <h4 className="mb-1">Teacher needed for class 5</h4>
            <div className="text-muted mb-3" style={{ fontSize: "12px" }}>
              Posted on {tution.posted_at}
            </div>
            <div className="row no-gutters">
              <div className="col-6">
                <table
                  className="table table-borderless table-sm"
                  style={{ fontSize: "14px" }}
                >
                  <tr>
                    <th className="pl-0 py-1" style={{ width: "65px" }}>
                      Class:
                    </th>
                    <td className="py-1">{tution.class}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1">Medium:</th>
                    <td className="py-1">{tution.medium}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1">Location:</th>
                    <td className="py-1">{tution.district}</td>
                  </tr>
                </table>
              </div>
              <div className="col-6">
                <table
                  className="table table-borderless table-sm"
                  style={{ fontSize: "12px" }}
                >
                  <tr>
                    <th className="pl-0 py-1" style={{ width: "100px" }}>
                      Salary:
                    </th>
                    <td className="py-1">{tution.salaryrange}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1">Subjects:</th>
                    <td className="py-1">{tution.subject1}</td>
                  </tr>
                  <tr>
                    <th className="pl-0 py-1">Tutor Gender:</th>
                    <td className="py-1">{tution.tutorgender}</td>
                  </tr>
                </table>
              </div>
            </div>
            <Link
              to={`/tution/${tution._id}`}
              className="btn btn-primary btn-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

CarouselItems.propTypes = {
  tution: PropTypes.object.isRequired
};
export default CarouselItems;
