import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux"; //for connecting component with redux
import { registerUser } from "../../actions/AuthAction"; //importing auth_action
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class register extends Component {
  // create state
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      phone: "",
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //on change function fired when a input is given e==event
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }); //setting the input with value in state
  }
  //onsubmit fired when form is submitted
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    //console.log(newuser);
    // axios
    //   .post("/api/users/register", newUser)
    //   .then(res => {
    //     console.log(res.data);
    //     this.props.history.push("/login");
    //   })
    //   .catch(err => this.setState({ errors: err.response.data })); //assigning state errors with err if found
  }

  render() {
    const errors = this.state.errors; //assigning errors to from state
    //const user = this.props.auth.user;

    return (
      <div className="register">
        {/* {user ? user.name : null} */}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your FindTutor account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    //"is-invalid" is a bootstrap class for input validation
                    //if "errors.name" found then is-invalid class will be active
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    //className='is-invalid form-control form-control-lg'
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange} //on change is tiggered when typed in input field
                  />
                  {errors.name && (
                    <div className="is-invalid">{errors.name}</div> //errors will be printed in registration UI
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                  {errors.email && (
                    <div className="is-invalid">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    //"is-invalid" is a bootstrap class for input validation
                    //if "errors.name" found then is-invalid class will be active
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.phone
                    })}
                    //className='is-invalid form-control form-control-lg'
                    placeholder="Phone number"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange} //on change is tiggered when typed in input field
                  />
                  {errors.phone && (
                    <div className="is-invalid">{errors.phone}</div> //errors will be printed in registration UI
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="is-invalid">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="is-invalid">{errors.password2}</div>
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
register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//connect state from store to component as props(property)
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(register));
