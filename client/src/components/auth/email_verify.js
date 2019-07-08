import React, { Component } from "react";
import { Link } from "react-router-dom";

class email_verify extends Component {
  render() {
    const tokenVerified = (
      <div>
        <h1>"you are successfully registered"</h1>
        <Link className="" to="/login">
          Login
        </Link>
      </div>
    );
    const tokenUnVerified = (
      <div>
        <h1>"your token cannot be verified"</h1>
        <Link className="" to="/register">
          Login
        </Link>
      </div>
    );

    return (
      <div>
        <h1 />
      </div>
    );
  }
}

export default email_verify;
