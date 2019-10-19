import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux"; //for connecting component with redux
import { loginAdmin } from "../../actions/AdminActions/AuthAdminAction";
import PropTypes from "prop-types";

class AdminLogin extends Component {
  // create state
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //if logged in then only path "/dashboard" will be redirect
  componentDidMount() {
    if (this.props.admin.isAuthenticated) {
      this.props.history.push("/admin/dashboard");
    }
  }

  //if component receive a new props
  componentWillReceiveProps(nextProps) {
    if (nextProps.admin.isAuthenticated) {
      this.props.history.push("/admin/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const logged_admin = {
      email: this.state.email,
      password: this.state.password
    };
    //console.log(logged_admin);
    this.props.loginAdmin(logged_admin);
  }

  //on change function fired when a input is given e==event
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const errors = this.state.errors; //assigning errors to from state
    return (
      <div className="AdminLogin">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your FindTutor Admin account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    //"is-invalid" is a bootstrap class for input validation
                    //if "errors.email" found then is-invalid class will be active
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange} //on change is tiggered when typed in input field
                  />
                  {errors.email && (
                    <div className="is-invalid">{errors.email}</div> //errors will be printed in registration UI
                  )}
                  {errors.msg && (
                    <div className="is-invalid">{errors.msg}</div> //errors will be printed in registration UI
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    //"is-invalid" is a bootstrap class for input validation
                    //if "errors.email" found then is-invalid class will be active
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange} //on change is tiggered when typed in input field
                  />
                  {errors.password && (
                    <div className="is-invalid">{errors.password}</div> //errors will be printed in registration UI
                  )}
                </div>
                <div>
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-info btn-block mt-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//defining properties type
AdminLogin.propTypes = {
  admin: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginAdmin: PropTypes.func.isRequired
};

//connect state from store to component as props(property)
const mapStateToProps = state => ({
  admin: state.admin,
  errors: state.errors
});
//connecting properties and state to component
export default connect(
  mapStateToProps,
  { loginAdmin }
)(AdminLogin);
