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
    const { tutions, loading } = this.props.tution;
    const { isAuthenticated } = this.props.auth;
    let tutionItems;
    if (tutions === null || loading) {
      tutionItems = <Spinner />;
    } else {
      //console.log(tutions.length);
      //console.log(typeof tutions);
      if (tutions.length > 0) {
        console.log(typeof tutions);
        console.log(tutions.length);
        console.log(tutions);
        tutionItems = tutions.map(tution => (
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
