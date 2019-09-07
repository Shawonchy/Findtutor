import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props; //profile is sent from profiles component as props

    return (
      // <div className="card card-body bg-light mb-3">
      //   <div className="row">
      //     <div className="col-2">
      //       <img src={profile.user.avatar} alt="" className="rounded-circle" />
      //     </div>
      //     <div className="col-lg-6 col-md-4 col-8">
      //       <h3>{profile.user.name}</h3>
      //       {/* <p>
      //         {profile.status}{" "}
      //         {isEmpty(profile.company) ? null : (
      //           <span>at {profile.company}</span>
      //         )}
      //       </p> */}
      //       <p>
      //         {isEmpty(profile.location) ? null : (
      //           <span>{profile.location}</span>
      //         )}
      //       </p>
      //       <Link to={`/profile/${profile.handle}`} className="btn btn-info">
      //         View Profile
      //       </Link>
      //     </div>
      //     <div className="col-md-4 d-none d-md-block">
      //       <h4>Skill Set</h4>
      //       <ul className="list-group">
      //         {/* mapping all skills and slice the first 4 skills */}
      //         {profile.skills.slice(0, 4).map((skill, index) => (
      //           <li key={index} className="list-group-item">
      //             <i className="fa fa-check pr-1" />
      //             {skill}
      //           </li>
      //         ))}
      //       </ul>
      //     </div>
      //   </div>
      // </div>

      <div>
        {/* <!-- Grid row --> */}

        {/* <!-- Grid column --> */}
        <div class="col-lg-3 col-md-6 mb-lg-0 mb-5">
          <div class="avatar mx-auto">
            <img
              src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg"
              class="rounded-circle z-depth-1"
              alt="Sample avatar"
            ></img>
          </div>
          <h5 class="font-weight-bold mt-4 mb-3">{profile.user.name}</h5>
          <p class="text-uppercase blue-text">
            <strong>Graphic designer</strong>
          </p>
          <p class="grey-text">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci sed quia non numquam modi tempora eius.
          </p>
          <ul class="list-unstyled mb-0">
            <a class="p-2 fa-lg fb-ic">
              <i class="fab fa-facebook-f blue-text"> </i>
            </a>

            <a class="p-2 fa-lg tw-ic">
              <i class="fab fa-twitter blue-text"> </i>
            </a>

            <a class="p-2 fa-lg ins-ic">
              <i class="fab fa-instagram blue-text"> </i>
            </a>
          </ul>
        </div>
        {/* <!-- Grid column -->

    <!-- Grid column --> */}
        {/* <div class="col-lg-3 col-md-6 mb-lg-0 mb-5">
            <div class="avatar mx-auto">
              <img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg"
                class="rounded-circle z-depth-1"
                alt="Sample avatar"
              ></img>
            </div>
            <h5 class="font-weight-bold mt-4 mb-3">John Doe</h5>
            <p class="text-uppercase blue-text">
              <strong>Web developer</strong>
            </p>
            <p class="grey-text">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              ipsa accusantium doloremque rem laudantium totam aperiam.
            </p>
            <ul class="list-unstyled mb-0">
              <a class="p-2 fa-lg fb-ic">
                <i class="fab fa-facebook-f blue-text"> </i>
              </a>

              <a class="p-2 fa-lg ins-ic">
                <i class="fab fa-instagram blue-text"> </i>
              </a>
            </ul>
          </div> */}
        {/* <!-- Grid column -->

    <!-- Grid column --> */}
        {/* <div class="col-lg-3 col-md-6 mb-md-0 mb-5">
            <div class="avatar mx-auto">
              <img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                class="rounded-circle z-depth-1"
                alt="Sample avatar"
              ></img>
            </div>
            <h5 class="font-weight-bold mt-4 mb-3">Maria Smith</h5>
            <p class="text-uppercase blue-text">
              <strong>Photographer</strong>
            </p>
            <p class="grey-text">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim est fugiat nulla id eu laborum.
            </p>
            <ul class="list-unstyled mb-0">
              <a class="p-2 fa-lg fb-ic">
                <i class="fab fa-facebook-f blue-text"> </i>
              </a>

              <a class="p-2 fa-lg ins-ic">
                <i class="fab fa-instagram blue-text"> </i>
              </a>

              <a class="p-2 fa-lg ins-ic">
                <i class="fab fa-dribbble blue-text"> </i>
              </a>
            </ul>
          </div> */}
        {/* <!-- Grid column -->

    <!-- Grid column --> */}
        {/* <div class="col-lg-3 col-md-6">
            <div class="avatar mx-auto">
              <img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg"
                class="rounded-circle z-depth-1"
                alt="Sample avatar"
              ></img>
            </div>
            <h5 class="font-weight-bold mt-4 mb-3">Tom Adams</h5>
            <p class="text-uppercase blue-text">
              <strong>Backend developer</strong>
            </p>
            <p class="grey-text">
              Perspiciatis repellendus ad odit consequuntur, eveniet earum nisi
              qui consectetur totam officia voluptates perferendis voluptatibus
              aut.
            </p>
            <ul class="list-unstyled mb-0">
              <a class="p-2 fa-lg fb-ic">
                <i class="fab fa-facebook-f blue-text"> </i>
              </a>

              <a class="p-2 fa-lg ins-ic">
                <i class="fab fa-github blue-text"> </i>
              </a>
            </ul>
          </div> */}
        {/* <!-- Grid column --> */}

        {/* <!-- Grid row --> */}
      </div>
    );
  }
}
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
