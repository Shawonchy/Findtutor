import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
//import TextAreaFieldGroup from "../Common/TextAreaFieldGroup";
//import TextFieldGroup from "../Common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTutionInfo } from "../../actions/ProfileAction";

class AddTutionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expected_min_salary: "",
      current_Status_for_Tuition: "",
      days_per_week: "",
      preferred_class: "",
      preffered_subject: "",
      preffered_medium: "",
      //current: false,
      preffered_areas: "",
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

    const tutionInfoData = {
      expected_min_salary: this.state.expected_min_salary,
      current_Status_for_Tuition: this.state.current_Status_for_Tuition,
      days_per_week: this.state.days_per_week,
      preferred_class: this.state.preferred_class,
      preffered_subject: this.state.preffered_subject,
      preffered_medium: this.state.preffered_medium,
      //current: this.state.current,
      preffered_areas: this.state.preffered_areas
    };

    this.props.addTutionInfo(tutionInfoData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <div className="form-group-row">
              <label for="inputEmail3" className="col-sm-2 col-form-label">
                <strong>Expected Minimum Salary</strong>
              </label>
              <div className="col-sm-10">
                <input
                  type="expected_min_salary"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.expected_min_salary
                  })}
                  placeholder="expected_min_salary"
                  name="expected_min_salary"
                  value={this.state.expected_min_salary}
                  onChange={this.onChange}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddTutionInfo.propTypes = {
  addTutionInfo: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTutionInfo }
)(withRouter(AddTutionInfo));
