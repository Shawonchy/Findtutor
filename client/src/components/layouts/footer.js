import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class footer extends Component {
  render() {
    const adminisAuthenticated = this.props.admin.isAuthenticated;
    let footer;
    if (adminisAuthenticated) {
      footer = <div></div>;
    } else {
      footer = (
        <div className="bg-dark text-white mt-5 p-4 text-center container-fluid">
          Copyright &copy; {new Date().getFullYear()} FindTutor
        </div>
      );
    }
    return <div>{footer}</div>;
  }
}
footer.propTypes = {
  admin: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  admin: state.admin
});
export default connect(mapStateToProps)(footer);
