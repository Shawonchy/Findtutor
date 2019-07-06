import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux"; //for connecting component with redux
import { loginUser } from "../../actions/AuthAction";
import PropTypes from "prop-types";

class login extends Component {
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
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  //if component receive a new props
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const logged_user = {
      email: this.state.email,
      password: this.state.password
    };
    //console.log(logged_user);
    this.props.loginUser(logged_user);
  }

  //on change function fired when a input is given e==event
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const errors = this.state.errors; //assigning errors to from state
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your FindTutor account
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//defining properties type
login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

//connect state from store to component as props(property)
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
//connecting properties and state to component
export default connect(
  mapStateToProps,
  { loginUser }
)(login);
