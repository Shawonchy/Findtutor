import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileItems from "../Profiles/ProfileItems";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";
class Profiles extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      postperpage: 3,
      setCurrentPage: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  //pagenation
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { profiles, loading } = this.props.profile;
    console.log(profiles);

    const { currentPage, postperpage } = this.state;
    // Logic for displaying todos
    const indexOfLastPost = currentPage * postperpage;
    const indexOfFirstPost = indexOfLastPost - postperpage;

    let profileItems;
    let pagenateitem;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
      pagenateitem = <Spinner />;
    } else {
      //for pagenation
      const currentProfiles = profiles.slice(indexOfFirstPost, indexOfLastPost);
      if (currentProfiles.length > 0) {
        profileItems = currentProfiles.map(profile => (
          <ProfileItems key={profile._id} profile={profile} />
        ));

        // Logic for displaying page numbers
        //pagenation
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(profiles.length / postperpage); i++) {
          pageNumbers.push(i);
        }

        pagenateitem = (
          <nav>
            <ul className="pagination">
              {pageNumbers.map(number => (
                <li key={number} className="page-item">
                  <a
                    onClick={this.handleClick}
                    id={number}
                    className="page-link"
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        );
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Tutor Profiles</h1>
              <p className="lead text-center">Browse and connect with Tutors</p>
              {profileItems}
              {pagenateitem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Profiles.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Profiles);
