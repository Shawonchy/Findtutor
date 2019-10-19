import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAppliedTutions } from "../../actions/TutionAction";
import Spinner from "../Common/Spinner";
import TutionItems from "../Tutions/TutionItems";
class MyApplications extends Component {
  componentDidMount() {
    this.props.getAppliedTutions();
  }
  render() {
    const { appliedtutions, loading } = this.props.tution;
    const { isAuthenticated } = this.props.auth;
    console.log(appliedtutions);
    let tutionItems;
    if (appliedtutions === null || loading) {
      tutionItems = <Spinner />;
    } else {
      //console.log(appliedtutions.length);
      //console.log(typeof appliedtutions);
      if (appliedtutions.length > 0) {
        console.log(typeof appliedtutions);
        console.log(appliedtutions.length);
        console.log(appliedtutions);
        tutionItems = appliedtutions.map(tution => (
          //tution property is sent to tutionItems component
          <TutionItems
            key={tution._id}
            tution={tution}
            isAuthenticated={isAuthenticated}
          />
        ));
      } else {
        tutionItems = <h4>No tutions found</h4>;
      }
    }

    return (
      <div>
        <div className="tutions">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <h1 className="display-4 text-center">Applied Tutions</h1>

                {tutionItems}
              </div>
              <div class="colmd-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyApplications.propTypes = {
  getAppliedTutions: PropTypes.func.isRequired,
  tution: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tution: state.tution,
  auth: state.auth
});

MyApplications.propTypes = {
  getAppliedTutions: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { getAppliedTutions }
)(MyApplications);
