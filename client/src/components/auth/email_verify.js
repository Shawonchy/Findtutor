import React, { Component } from "react";
import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import axios from "axios";
//import { connect } from "react-redux"; //for connecting component with redux
//import { emailVerification } from "../../actions/AuthAction";

class email_verify extends Component {
  // create state
  constructor() {
    super();
    this.state = {
      isVerified: false,
      errors: false
    };
  }
  componentDidMount() {
    axios
      .post("http://localhost:5000/api/users/confirmation", {
        token: this.props.match.params.token
      })
      .then(res => {
        console.log(res);
        if (res.data.token) {
          this.setState({
            isVerified: true
          });
        }
      })
      .catch(err => {
        // console.log(err);
        // this.setState({
        //   isVerified: false,
        //   errors: true
        // });
      });
  }

  render() {
    //console.log(this.props);
    //this.props.emailVerification(tokenobj);
    //const isVerified = this.props.verify.isVerified;
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
        <h1>"you are not not verified</h1>
        <Link className="" to="/register">
          Signup
        </Link>
      </div>
    );

    return <div>{this.state.isVerified ? tokenVerified : tokenUnVerified}</div>;
  }
}
// email_verify.propTypes = {
//   emailVerification: PropTypes.func.isRequired,
//   verify: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   verify: state.verify,
//   errors: state.errors
// });

// export default connect(
//   mapStateToProps,
//   { emailVerification }
// )(email_verify);
export default email_verify;
