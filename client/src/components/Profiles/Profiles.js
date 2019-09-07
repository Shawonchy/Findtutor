import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/ProfileAction";
import ProfileItems from "./ProfileItems";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";
class Profiles extends Component {
  constructor() {
    super();

    this.onimageChange = this.onimageChange.bind(this);
  }

  componentDidMount() {
    this.props.getProfiles();
  }

  //taking the binary data of the image and convert to base64 string
  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach(b => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  onimageChange = data => {
    var base64Flag = "data:image/jpeg;base64,";
    var imageStr = this.arrayBufferToBase64(data);
    var image = base64Flag + imageStr;
    return image;
  };

  render() {
    const { profiles, loading } = this.props.profile;

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
                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg"
                        class="rounded-circle z-depth-1 w-50"
                        alt="Sample avatar"
                      ></img>
                    </div>
                    <h5 class="font-weight-bold mt-4 mb-1">
                      {profiles[i].user.name}
                    </h5>
                    <p class="text-muted" style={{ fontSize: "14px" }}>
                      <strong>Graphic designer</strong>
                    </p>
                    {/* <ul class="list-unstyled mb-0">
                    <a class="p-2 fa-lg fb-ic">
                      <i class="fab fa-facebook-f blue-text"> </i>
                    </a>

                    <a class="p-2 fa-lg tw-ic">
                      <i class="fab fa-twitter blue-text"> </i>
                    </a>

                    <a class="p-2 fa-lg ins-ic">
                      <i class="fab fa-instagram blue-text"> </i>
                    </a>
                  </ul> */}
                    <Link
                      to={`/profile/${profiles[i].handle}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Profile
                    </Link>
                  </div>

                  <div class="col-lg-3 col-md-6 mb-lg-0 mb-5">
                    <div class="avatar mx-auto">
                      <img
                        src={this.onimageChange(profiles[i + 1].img.data.data)}
                        class="rounded-circle z-depth-1 w-50"
                        alt="Sample avatar"
                      ></img>
                    </div>
                    <h5 class="font-weight-bold mt-4 mb-1">
                      {profiles[i + 1].user.name}
                    </h5>
                    <p class="text-muted" style={{ fontSize: "14px" }}>
                      <strong>Web developer</strong>
                    </p>
                    {/* <ul class="list-unstyled mb-0">
                    <a class="p-2 fa-lg fb-ic">
                      <i class="fab fa-facebook-f blue-text"> </i>
                    </a>

                    <a class="p-2 fa-lg ins-ic">
                      <i class="fab fa-instagram blue-text"> </i>
                    </a>
                  </ul> */}
                    <Link
                      to={`/profile/${profiles[i + 1].handle}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Profile
                    </Link>
                  </div>

                  <div class="col-lg-3 col-md-6 mb-md-0 mb-5">
                    <div class="avatar mx-auto">
                      <img
                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                        class="rounded-circle z-depth-1 w-50"
                        alt="Sample avatar"
                      ></img>
                    </div>
                    <h5 class="font-weight-bold mt-4 mb-1">
                      {profiles[i + 2].user.name}
                    </h5>
                    <p class="text-muted" style={{ fontSize: "14px" }}>
                      <strong>Photographer</strong>
                    </p>
                    {/* <ul class="list-unstyled mb-0">
                    <a class="p-2 fa-lg fb-ic">
                      <i class="fab fa-facebook-f blue-text"> </i>
                    </a>

                    <a class="p-2 fa-lg ins-ic">
                      <i class="fab fa-instagram blue-text"> </i>
                    </a>

                    <a class="p-2 fa-lg ins-ic">
                      <i class="fab fa-dribbble blue-text"> </i>
                    </a>
                  </ul> */}
                    <Link
                      to={`/profile/${profiles[i + 2].handle}`}
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
                      {profiles[i + 3].user.name}
                    </h5>
                    <p class="text-muted" style={{ fontSize: "14px" }}>
                      <strong>Backend developer</strong>
                    </p>
                    {/* <ul class="list-unstyled mb-0">
                    <a class="p-2 fa-lg fb-ic">
                      <i class="fab fa-facebook-f text-muted" style={{ fontSize: '14px' }}> </i>
                    </a>

                    <a class="p-2 fa-lg ins-ic">
                      <i class="fab fa-github text-muted" style={{ fontSize: '14px' }}> </i>
                    </a>
                  </ul> */}
                    <Link
                      to={`/profile/${profiles[i + 3].handle}`}
                      className="btn btn-primary btn-sm"
                    >
                      View profile
                    </Link>
                  </div>
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
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
