import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { connect } from "react-redux";
import PropTypes from "prop-types";
//import { getTutions } from "../../actions/TutionAction";
//import Spinner from "../Common/Spinner";
//import TutionItems from "./TutionItems";
import CarouselItems from "./CarouselItems";
class TutionCarousel extends Component {
  render() {
    const { tutions } = this.props;
    const tutionindex1 = tutions[0];
    let carouselItems;
    //console.log(tutions.length);
    //console.log(typeof tutions);
    if (tutions.length > 0) {
      console.log(typeof tutions);
      console.log(tutions.length);
      console.log(tutions);

      console.log(tutionindex1);

      carouselItems = tutions.map(tution => (
        //tution property is sent to carouselItems component
        //<carouselItems key={tution._id} tution={tution} />
        <CarouselItems key={tution._id} tution={tution} />
      ));
    } else {
      carouselItems = <h4>No tutions found</h4>;
    }

    return (
      <div>
        <div className="tutionscarosol">
          <div className="container">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="card">
                    {/* <div
                      className="card-header"
                      style={{ background: "green" }}
                    >
                      <strong>{tutionindex1.location}</strong>
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
                              {tutionindex1.class},{tutionindex1.subject}
                            </strong>{" "}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5">
                            <strong>Days per week</strong>
                          </div>
                          <div className="col">
                            <strong>{tutionindex1.daysperweek}</strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5">
                            <strong>Salary Range</strong>
                          </div>
                          <div className="col">
                            <strong>{tutionindex1.salaryrange}</strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-11" />
                          <div className="col">
                            <Link to={`/tution/${tutionindex1._id}`}>
                              View details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="border rounded p-4 bg-light">
                      <h4 className="mb-1">Teacher needed for class 5</h4>
                      <div
                        className="text-muted mb-3"
                        style={{ fontSize: "12px" }}
                      >
                        Posted on {tutionindex1.posted_at}
                      </div>
                      <div className="row no-gutters">
                        <div className="col-6">
                          <table
                            className="table table-borderless table-sm"
                            style={{ fontSize: "14px" }}
                          >
                            <tr>
                              <th
                                className="pl-0 py-1"
                                style={{ width: "65px" }}
                              >
                                Class:
                              </th>
                              <td className="py-1">{tutionindex1.class}</td>
                            </tr>
                            <tr>
                              <th className="pl-0 py-1">Medium:</th>
                              <td className="py-1">{tutionindex1.medium}</td>
                            </tr>
                            <tr>
                              <th className="pl-0 py-1">Location:</th>
                              <td className="py-1">{tutionindex1.district}</td>
                            </tr>
                          </table>
                        </div>
                        <div className="col-6">
                          <table
                            className="table table-borderless table-sm"
                            style={{ fontSize: "12px" }}
                          >
                            <tr>
                              <th
                                className="pl-0 py-1"
                                style={{ width: "100px" }}
                              >
                                Salary:
                              </th>
                              <td className="py-1">
                                {tutionindex1.salaryrange}
                              </td>
                            </tr>
                            <tr>
                              <th className="pl-0 py-1">Subjects:</th>
                              <td className="py-1">{tutionindex1.subject1}</td>
                            </tr>
                            <tr>
                              <th className="pl-0 py-1">Tutor Gender:</th>
                              <td className="py-1">
                                {tutionindex1.tutorgender}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <Link
                        to={`/tution/${tutionindex1._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
                {carouselItems}
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleControls"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleControls"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

TutionCarousel.propTypes = {
  tutions: PropTypes.object.isRequired
};
export default TutionCarousel;
