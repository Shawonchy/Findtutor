import React, { Component } from "react";
import axios from "axios";
import { uploadimage } from "../../actions/ProfileAction";
class Uploadphoto extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null
    };
    //this.onSubmit = this.onSubmit.bind(this);
    //this.onChange = this.onChange.bind(this);
  }
  // onSubmit(e) {
  //   e.preventDefault();
  //   const value = {
  //     data: this.state.picture,
  //     contenttype: "image/png"
  //   };
  //   uploadimage(value);
  // }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0], //selected file from device
      loaded: 0
    });
  };

  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post("http://localhost:5000/api/profile/uploadpicture", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
      });
    this.props.history.push("/dashboard");
  };
  // componentDidMount() {
  //   this.props.history.push("/dashboard");
  // }

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
          {/* <div className="col-md-9">
            <input type="file" name="myFile" />
            <br />
            <strong>Click to upload image</strong>
          </div> */}
        </div>
        <div className="row">
          <div class="col">
            <form
              name="form1"
              //onSubmit={this.onSubmit}
              enctype="multipart/form-data"
            >
              <input
                type="file"
                name="file"
                //accept="application/x-zip-compressed,image/*"
                onChange={this.onChangeHandler}
              />
              <button
                type="button"
                class="btn btn-success btn-block"
                onClick={this.onClickHandler}
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Uploadphoto;
