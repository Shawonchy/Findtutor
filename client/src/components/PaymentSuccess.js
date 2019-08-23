import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class PaymentSuccess extends Component {
  componentDidMount() {
    const { user } = this.props.auth;
    const value = {
      id: user.id
    };
    axios
      .post("http://localhost:5000/api/users/update-tutor-type", value)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }
  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <div>
        <h1>Scceeded</h1>
      </div>
    );
  }
}
PaymentSuccess.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PaymentSuccess);
