import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//component=dashboard component
const Privateroute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? ( //if authenticated then redirect to dashboard    else to login
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

Privateroute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Privateroute);
