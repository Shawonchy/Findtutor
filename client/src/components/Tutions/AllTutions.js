import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTutions } from "../../actions/TutionAction";
import Spinner from "../Common/Spinner";
import TutionItems from "./TutionItems";
class AllTutions extends Component {
  componentDidMount() {
    this.props.getTutions();
  }

  render() {
    const { tutions, loading } = this.props.tution;
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
          <TutionItems key={tution._id} tution={tution} />
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
                <h1 className="display-4 text-center">Tutions</h1>
                <p className="lead text-center">Browse and findTutions</p>
                {tutionItems}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AllTutions.propTypes = {
  getTutions: PropTypes.func.isRequired,
  tution: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tution: state.tution
});

export default connect(
  mapStateToProps,
  { getTutions }
)(AllTutions);
