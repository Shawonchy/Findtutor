import React, { Component } from "react";
import isEmpty from "../../validation/isEmpty";
import Education from "../Dashboard/Education";
class ProfileHeader extends Component {
  constructor() {
    super();
    //this.onimageChange = this.onimageChange.bind(this);
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
    // const { profile } = this.props;
    // return (
    //   <div className="row">
    //     <div className="col-md-12">
    //       <div className="card card-body bg-info text-white mb-3">
    //         <div className="row">
    //           <div className="col-4 col-md-3 m-auto">
    //             <img
    //               className="rounded-circle"
    //               src={profile.user.avatar}
    //               alt=""
    //             />
    //           </div>
    //         </div>
    //         <div className="text-center">
    //           <h1 className="display-4 text-center">{profile.user.name}</h1>
    //           {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
    //           <p>
    //             {isEmpty(profile.social && profile.social.twitter) ? null : (
    //               <a
    //                 className="text-white p-2"
    //                 href={profile.social.twitter}
    //                 target="_blank"
    //               >
    //                 <i className="fab fa-twitter fa-2x" />
    //               </a>
    //             )}

    //             {isEmpty(profile.social && profile.social.facebook) ? null : (
    //               <a
    //                 className="text-white p-2"
    //                 href={profile.social.facebook}
    //                 target="_blank"
    //               >
    //                 <i className="fab fa-facebook fa-2x" />
    //               </a>
    //             )}

    //             {isEmpty(profile.social && profile.social.linkedin) ? null : (
    //               <a
    //                 className="text-white p-2"
    //                 href={profile.social.linkedin}
    //                 target="_blank"
    //               >
    //                 <i className="fab fa-linkedin fa-2x" />
    //               </a>
    //             )}

    //             {isEmpty(profile.social && profile.social.youtube) ? null : (
    //               <a
    //                 className="text-white p-2"
    //                 href={profile.social.youtube}
    //                 target="_blank"
    //               >
    //                 <i className="fab fa-youtube fa-2x" />
    //               </a>
    //             )}

    //             {isEmpty(profile.social && profile.social.instagram) ? null : (
    //               <a
    //                 className="text-white p-2"
    //                 href={profile.social.instagram}
    //                 target="_blank"
    //               >
    //                 <i className="fab fa-instagram fa-2x" />
    //               </a>
    //             )}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );

    const { profile } = this.props;
    console.log(profile);
    console.log(profile.tution_info);
    console.log(profile.education);

    let tutionInfoContent;
    if (typeof profile.tution_info == "undefined") {
      tutionInfoContent = (
        <table className="table table-bordered">
          <tr>
            <th className="bg-light">Expected Salary</th>
            <td></td>
          </tr>
          <tr>
            <th className="bg-light">Days Per Week</th>
            <td></td>
          </tr>
          <tr>
            <th className="bg-light">Preffered Subject</th>
            <td></td>
          </tr>
          <tr>
            <th className="bg-light">Preffered Class</th>
            <td></td>
          </tr>
          <tr>
            <th className="bg-light">Preffered Medium</th>
            <td></td>
          </tr>
          <tr>
            <th className="bg-light">Current Status</th>
            <td></td>
          </tr>
        </table>
      );
    } else {
      tutionInfoContent = (
        <table className="table table-bordered">
          <tr>
            <th className="bg-light">Expected Salary</th>
            <td>
              {
                (profile.tution_info.expected_min_salary = !isEmpty(
                  profile.tution_info.expected_min_salary
                )
                  ? profile.tution_info.expected_min_salary
                  : "")
              }
            </td>
          </tr>
          <tr>
            <th className="bg-light">Days Per Week</th>
            <td>
              {
                (profile.tution_info.days_per_week = !isEmpty(
                  profile.tution_info.days_per_week
                )
                  ? profile.tution_info.days_per_week
                  : "")
              }
            </td>
          </tr>
          <tr>
            <th className="bg-light">Preffered Subject</th>
            <td>
              {
                (profile.tution_info.preffered_subject = !isEmpty(
                  profile.tution_info.preffered_subject
                )
                  ? profile.tution_info.preffered_subject
                  : "")
              }
            </td>
          </tr>
          <tr>
            <th className="bg-light">Preffered Class</th>
            <td>
              {
                (profile.tution_info.preferred_class = !isEmpty(
                  profile.tution_info.preferred_class
                )
                  ? profile.tution_info.preferred_class
                  : "")
              }
            </td>
          </tr>
          <tr>
            <th className="bg-light">Preffered Medium</th>
            <td>
              {
                (profile.tution_info.preffered_medium = !isEmpty(
                  profile.tution_info.preffered_medium
                )
                  ? profile.tution_info.preffered_medium
                  : "")
              }
            </td>
          </tr>
          <tr>
            <th className="bg-light">Current Status</th>
            <td>
              {
                (profile.tution_info.current_Status_for_Tuition = !isEmpty(
                  profile.tution_info.current_Status_for_Tuition
                )
                  ? profile.tution_info.current_Status_for_Tuition
                  : "")
              }
            </td>
          </tr>
        </table>
      );
    }
    return (
      <div>
        <div className="row mb-3">
          <div className="col-md-6">
            <img
              width="120px"
              height="200px"
              src={this.onimageChange(profile.img.data.data)}
              alt="Helpful alt text"
            />
          </div>
          <div className="col-md-6">
            {/* <h2 className="text-left">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </h2>

            <div>Qualification:</div>
            <div>Experience:</div>
            <div>Area covered:</div>
            <div>Teaching:</div>
            <div>Phone:</div>
            <div>Email:</div> */}
            <div className="alert alert-success p-2">
              <h5 className="mb-0">{profile.user.name}</h5>
            </div>
            <table className="table table-bordered">
              {/* <tr>
                <th className="bg-light">Qualification</th>
                <td></td>
              </tr> */}
              <tr>
                <th className="bg-light">Experience</th>
                <td>
                  {
                    (profile.experience = !isEmpty(profile.experience)
                      ? profile.experience
                      : "")
                  }
                </td>
              </tr>
              <tr>
                <th className="bg-light">Area Covered</th>
                <td>
                  {
                    (profile.upazila = !isEmpty(profile.upazila)
                      ? profile.upazila
                      : "")
                  }
                </td>
              </tr>
              <tr>
                <th className="bg-light">Phone</th>
                <td>
                  {
                    (profile.user.phone = !isEmpty(profile.user.phone)
                      ? profile.user.phone
                      : "")
                  }
                </td>
              </tr>
              <tr>
                <th className="bg-light">Email</th>
                <td>
                  {
                    (profile.user.email = !isEmpty(profile.user.email)
                      ? profile.user.email
                      : "")
                  }
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div class="alert alert-info">Tution Info</div>
            {tutionInfoContent}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div class="alert alert-info">Educational Qualification</div>
            <Education education={profile.education} />
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileHeader;
