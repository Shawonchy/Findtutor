import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";
//import { getProfiles } from "../../actions/ProfileAction";
import ProfileItems from "../Profiles/ProfileItems";
import Spinner from "../Common/Spinner";
class SearchResult extends Component {
  render() {
    const { profiles, loading } = this.props.profile;
    // //console.log(typeof profiles);
    // let profileItems;
    // if (profiles === null || loading) {
    //   profileItems = <Spinner />;
    // } else {
    //   console.log(profiles.length);
    //   console.log(typeof profiles);
    //   console.log(profiles);
    //   if (profiles.length > 0) {
    //     profileItems = profiles.map(profile => (
    //       //profile property is sent to ProfileItems component
    //       <ProfileItems key={profile._id} profile={profile} />
    //     ));
    //   } else {
    //     profileItems = <h4>No profiles found</h4>;
    //   }
    // }
    // return (
    //   <div>
    //     <div className="profiles">
    //       <div className="container">
    //         <div className="row">
    //           <div className="col-md-12">
    //             <h1 className="display-4 text-center">Tutors Profiles</h1>
    //             <p className="lead text-center">
    //               Browse and connect with Tutors
    //             </p>
    //             {profileItems}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );

    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      //console.log(profiles.length);
      //console.log(typeof profiles);
      if (profiles.length > 0) {
        console.log(typeof profiles);
        console.log(profiles.length);
        console.log(profiles);
        var i = 0;
        for (
          i == 0;
          i < profiles.length;
          i += 4 // profileItems = profiles.map(profile => ( //   //profile property is sent to ProfileItems component //   <ProfileItems key={profile._id} profile={profile} /> // ));
        ) {
          profileItems = (
            <div class="row justify-content-center">
              <div class="col-lg-9">
                <div class="row">
                  <div class="col-lg-3 col-md-6 mb-lg-0 mb-5">
                    <div class="avatar mx-auto">
                      <img
                        src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                        class="rounded-circle z-depth-1 w-50"
                        alt="Sample avatar"
                      ></img>
                    </div>
                    <h5 class="font-weight-bold mt-4 mb-1">
                      {
                        (profiles[i].user.name =
                          "user.name" in profiles[i]
                            ? profiles[i].user.name
                            : "")
                      }
                    </h5>
                    <p class="text-muted" style={{ fontSize: "14px" }}>
                      <strong>
                        {
                          (profiles[i].expert =
                            "expert" in profiles[i] ? profiles[i].expert : "")
                        }{" "}
                        teacher
                      </strong>
                    </p>

                    <Link
                      to={`/profile/${(profiles[i].handle =
                        "handle" in profiles[i] ? profiles[i].handle : "")}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Profile
                    </Link>
                  </div>

                  <div class="col-lg-3 col-md-6 mb-lg-0 mb-5">
                    <div class="avatar mx-auto">
                      <img
                        src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                        class="rounded-circle z-depth-1 w-50"
                        alt="Sample avatar"
                      ></img>
                    </div>
                    <h5 class="font-weight-bold mt-4 mb-1">
                      {/* {
                        (profiles[i + 1].user.name =
                          "profiles[i+1]" in profiles
                            ? profiles[i + 1].user.name
                            : "")
                      } */}
                    </h5>
                    <p class="text-muted" style={{ fontSize: "14px" }}>
                      <strong>
                        {/* {
                          (profiles[i + 1].expert =
                            "profiles[i+1]" in profiles
                              ? profiles[i + 1].expert
                              : "")
                        }{" "} */}
                        teacher
                      </strong>
                    </p>
                    {/* <Link
                      to={`/profile/${(profiles[i + 1].handle =
                        "profiles[i+1]" in profiles
                          ? profiles[i + 1].handle
                          : "")}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Profile
                    </Link> */}
                  </div>
                  {/*
                  <div class="col-lg-3 col-md-6 mb-md-0 mb-5">
                    <div class="avatar mx-auto">
                      <img
                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                        class="rounded-circle z-depth-1 w-50"
                        alt="Sample avatar"
                      ></img>
                    </div>
                    <h5 class="font-weight-bold mt-4 mb-1">
                      {
                        (profiles[i + 2].user.name = !isEmpty(
                          profiles[i + 2].user.name
                        )
                          ? profiles[i + 2].user.name
                          : "")
                      }
                    </h5>
                    <p class="text-muted" style={{ fontSize: "14px" }}>
                      <strong>
                        {
                          (profiles[i + 2].expert = !isEmpty(
                            profiles[i + 2].expert
                          )
                            ? profiles[i + 2].expert
                            : "")
                        }{" "}
                        teacher
                      </strong>
                    </p>
                    
                    <Link
                      to={`/profile/${(profiles[i + 2].handle = !isEmpty(
                        profiles[i + 2].handle
                      )
                        ? profiles[i + 2].handle
                        : "")}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Profile
                    </Link>
                  </div>

                  <div class="col-lg-3 col-md-6">
                    <div class="avatar mx-auto">
                      <img
                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg"
                        class="rounded-circle z-depth-1 w-50"
                        alt="Sample avatar"
                      ></img>
                    </div>
                    <h5 class="font-weight-bold mt-4 mb-1">
                      {
                        (profiles[i + 3].user.name = !isEmpty(
                          profiles[i + 3].user.name
                        )
                          ? profiles[i + 3].user.name
                          : "")
                      }
                    </h5>
                    <p class="text-muted" style={{ fontSize: "14px" }}>
                      <strong>
                        {
                          (profiles[i + 3].expert = !isEmpty(
                            profiles[i + 3].expert
                          )
                            ? profiles[i + 3].expert
                            : "")
                        }{" "}
                        teacher
                      </strong>
                    </p>
                    
                    <Link
                      to={`/profile/${(profiles[i + 3].handle = !isEmpty(
                        profiles[i + 3].handle
                      )
                        ? profiles[i + 3].handle
                        : "")}`}
                      className="btn btn-primary btn-sm"
                    >
                      View profile
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          );
        }
      } else {
        profileItems = <h4>No profiles found</h4>;
      }
    }
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        ></link>

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          rel="stylesheet"
        ></link>

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.6/css/mdb.min.css"
          rel="stylesheet"
        ></link>
        <section class="team-section text-center my-5">
          <h2 class="h1-responsive font-weight-bold mb-2">
            Our amazing Tutors
          </h2>
          {/* <!-- Section description --> */}
          <p class="grey-text w-responsive mx-auto mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
            error amet numquam iure provident voluptate esse quasi, veritatis
            totam voluptas nostrum quisquam eum porro a pariatur veniam.
          </p>
          {profileItems}
        </section>
      </div>
    );
  }
}
SearchResult.propTypes = {
  //getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(SearchResult);
