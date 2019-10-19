import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux"; //for connecting component with redux
import { registerUser } from "../../actions/AuthAction"; //importing auth_action
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import FlashMessage from "react-flash-message";

import { render } from "react-dom";

class RegisterAdmin extends Component {
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

    axios
      .post("http://localhost:5000/api/admin/register", newUser)
      .then(res => {
        //render(Message, document.body);
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  render() {
    const errors = this.state.errors;

    return (
      <div className="register">
        {/* {user ? user.name : null} */}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register Admin</h1>
              <div className="border p-3 border-primary rounded mb-4 bg-light">
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
                      This site uses Gravatar so if you want a profile image,
                      use a Gravatar email
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
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
RegisterAdmin.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(mapStateToProps)(withRouter(RegisterAdmin));
