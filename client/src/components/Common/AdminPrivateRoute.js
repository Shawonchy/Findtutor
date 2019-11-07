import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//component=dashboard component
const AdminPrivateRoute = ({ component: Component, admin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      admin.isAuthenticated === true ? ( //if authenticated then redirect to dashboard    else to login
        <Component {...props} />
      ) : (
        <Redirect to="/admin/login" />
      )
    }
  />
);

AdminPrivateRoute.propTypes = {
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps)(AdminPrivateRoute);
