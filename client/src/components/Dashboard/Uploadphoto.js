import React, { Component } from "react";

class Uploadphoto extends Component {
  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col">
            <div className="text-left">
              <img src="pofiles/profile.png" width="150px" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <strong>Change photo</strong>
          </div>
          <div className="col-md-9">
            <input type="file" name="myFile" />
            <br />
            <strong>Click to upload image</strong>
          </div>
        </div>
        <div className="row">
          <div class="col">
            <button
              type="submit"
              name="change_photo"
              id="change_photo"
              className="green medium"
            >
              {" "}
              <strong>Upload New Photo</strong>{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Uploadphoto;
