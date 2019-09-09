import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../Common/TextAreaFieldGroup";
import TextFieldGroup from "../Common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/ProfileAction";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      institute: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current_Status_for_Tuition: "",
      //current: false,
      description: "",
      errors: {}
      //disabled: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const eduData = {
      institute: this.state.institute,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current_Status_for_Tuition: this.state.current_Status_for_Tuition,
      //current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              {/* <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="institute"
                  value={this.state.institute}
                  onChange={this.onChange}
                  error={errors.institute}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  //disabled={this.state.disabled ? "disabled" : ""}
                />
               
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form> */}

              <div className="border p-3 border-primary rounded mb-4 bg-light">
                <div className="alert alert-success p-2">
                  <h6 className="mb-0">Add/Edit Educational Info</h6>
                </div>
                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="control-label">Institute</label>
                        <div className="inputGroupContainer">
                          <div className="input-group">
                            <input
                              id="institute"
                              name="institute"
                              placeholder="institute"
                              class="form-control"
                              type="text"
                              value={this.state.institute}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="control-label">Degree</label>
                        <div className="inputGroupContainer">
                          <div className="input-group">
                            <input
                              id="degree"
                              name="degree"
                              placeholder="degree"
                              class="form-control"
                              type="text"
                              value={this.state.degree}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="control-label">Group</label>
                        <div className="inputGroupContainer">
                          <div className="input-group">
                            <input
                              id="fieldofstudy"
                              name="fieldofstudy"
                              placeholder="fieldofstudy"
                              class="form-control"
                              type="text"
                              value={this.state.fieldofstudy}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">Date From</label>
                        <div className="inputGroupContainer">
                          <div className="input-group">
                            <input
                              id="date"
                              name="date"
                              placeholder="date"
                              class="form-control"
                              type="date"
                              value={this.state.date}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">Date To</label>
                        <div className="inputGroupContainer">
                          <div className="input-group">
                            <input
                              id="to"
                              name="to"
                              placeholder="to"
                              class="form-control"
                              type="date"
                              value={this.state.to}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-lg px-5 btn-info mt-4"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
