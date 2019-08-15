import React, { Component } from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class CarouselItems extends Component {
  render() {
    const { tution } = this.props;
    return (
      <div class="carousel-item">
        <div className="card">
          <div className="card-header" style={{ background: "green" }}>
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
