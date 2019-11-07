import React, { Component } from "react";
import Header from "./Sidebar";
import { getTutions } from "../../actions/TutionAction";
import { get_users } from "../../actions/AdminActions/AdminAction";
import { get_admins } from "../../actions/AdminActions/AdminAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../Common/Spinner";
class Content extends Component {
  constructor() {
    super();
    this.state = {
      tutions: ""
    };
  }
  componentDidMount() {
    this.props.getTutions();
    this.props.get_users();
    this.props.get_admins();
  }

  render() {
    const { tutions, loading } = this.props.tution;
    const { users, admins } = this.props.admin;
    const user_loading = this.props.admin.loading;
    console.log(this.props.admin.isAuthenticated);

    // let AdminDashboardContent;
    // if(tutions==null||loading && users==null||user_loading && admins==null||)

    let tutions_length;
    if (tutions == null || loading) {
      tutions_length = 0;
    } else {
      tutions_length = Object.keys(tutions).length;
    }

    let users_length;
    if (users == null || loading) {
      users_length = 0;
    } else {
      users_length = Object.keys(users).length;
    }

    let admins_length;
    if (admins == null || loading) {
      admins_length = 0;
    } else {
      admins_length = Object.keys(admins).length;
    }

    return (
      <div className="container">
        {/* Small boxes (Stat box) */}
        <div className="row">
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{admins_length}</h3>
                <p>Admins</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag" />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
              <div className="inner">
                <h3>
                  {/* 53<sup style={{ fontSize: 20 }}>%</sup> */}
                  {tutions_length}
                </h3>
                <p>Tutions</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>{users_length}</h3>
                <p>Registered Tutors</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>65</h3>
                <p>Tution Applications</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph" />
              </div>
              <a href="#" className="small-box-footer">
                More info <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>

          {/* ./col */}
        </div>
        {/* /.row */}
        {/* Main row */}
      </div>
    );
  }
}

Content.propTypes = {
  getTutions: PropTypes.func.isRequired,
  tution: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  get_admins: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tution: state.tution,
  admin: state.admin
});
export default connect(
  mapStateToProps,
  { getTutions, get_users, get_admins }
)(Content);
