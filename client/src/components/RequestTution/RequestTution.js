import React, { Component } from "react";
//import { connect } from "react-redux";
//import PropsTypes from "prop-types";
import SelectListGroup from "../Common/SelectListGroup";
import TextFieldGroup from "../Common/TextFieldGroup";
import axios from "axios";
import "./requestution";

class RequestTution extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      location: "",
      medium: "",
      class: "",
      subject: "",
      institute: "",
      daysperweek: "",
      studentgender: "",
      salaryrange: "",
      tutorgender: "",
      address: "",
      mobile: "",
      email: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const requesttutorData = {
      name: this.state.name,
      location: this.state.location,
      medium: this.state.medium,
      class: this.state.class,
      subject: this.state.subject,
      institute: this.state.institute,
      daysperweek: this.state.daysperweek,
      studentgender: this.state.studentgender,
      salaryrange: this.state.salaryrange,
      tutorgender: this.state.tutorgender,
      address: this.state.address,
      mobile: this.state.mobile,
      email: this.state.email
    };
    axios
      .post("http://localhost:5000/api/request-a-tutor", requesttutorData)
      .then(res => {
        console.log("successfully posted");
      })
      .catch(err => console.log(err));
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    const optlocation = [
      { label: "* Select your location", value: 0 },
      { label: "Dhaka", value: "Dhaka" },
      { label: "Sylhet", value: "Sylhet" },
      { label: "Chittagong", value: "Chittagong" }
    ];
    const optmedium = [
      { label: "* Select your medium", value: 0 },
      { label: "Bangla", value: "Bangla" },
      { label: "English", value: "English" }
    ];
    const optdaysperweek = [
      { label: "* Select how many daysperweek", value: 0 },
      { label: "4days/week", value: "4days/week" },
      { label: "5days/week", value: "5days/week" },
      { label: "3days/week", value: "3days/week" }
    ];
    const optsalaryrange = [
      { label: "* Select your salaryrange", value: 0 },
      { label: "1000-1500", value: "1000-1500" },
      { label: "2000-4000", value: "2000-4000" },
      { label: "4000-6000", value: "4000-6000" }
    ];
    const opttutorgender = [
      { label: "* Select your tutorgender", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" }
    ];
    const optstudentgender = [
      { label: "* Select your studentgender", value: 0 },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" }
    ];
    return (
      // <div>
      //   <div className="request-tution">
      //     <div className="container">
      //       <div className="row">
      //         <div className="col-md-8 m-auto">
      //           <h1 className="display-4 text-center">REQUEST A Tutor</h1>
      //           <p className="lead text-center">
      //             Let's get some information about the tutor you wanted for
      //           </p>
      //           <form onSubmit={this.onSubmit}>
      //             <TextFieldGroup
      //               name="name"
      //               //"*" for is required
      //               placeholder="* profile name"
      //               value={this.state.name}
      //               error={errors.name}
      //               onChange={this.onChange}
      //               info="A unique name for your profile URL. Your full name, company name, nickname"
      //               label="Full Name"
      //             />
      //             <SelectListGroup
      //               placeholder="location"
      //               name="location"
      //               value={this.state.location}
      //               onChange={this.onChange}
      //               options={optlocation}
      //               error={errors.location}
      //               info="Give us an idea of your location"
      //             />
      //             <SelectListGroup
      //               placeholder="medium"
      //               name="medium"
      //               value={this.state.medium}
      //               onChange={this.onChange}
      //               options={optmedium}
      //               error={errors.medium}
      //               info="Give us an idea of your medium"
      //             />
      //             <TextFieldGroup
      //               name="class"
      //               //"*" for is required
      //               placeholder="* class"
      //               value={this.state.class}
      //               error={errors.class}
      //               onChange={this.onChange}
      //               info="class in which student is studying"
      //               label="Class"
      //             />
      //             <TextFieldGroup
      //               name="subject"
      //               //"*" for is required
      //               placeholder="* subject"
      //               value={this.state.subject}
      //               error={errors.subject}
      //               onChange={this.onChange}
      //               info="subject in which student is studying"
      //               label="subject"
      //             />
      //             <TextFieldGroup
      //               name="institute"
      //               //"*" for is required
      //               placeholder="* institute"
      //               value={this.state.institute}
      //               error={errors.institute}
      //               onChange={this.onChange}
      //               info="institute in which student is studying"
      //               label="institute"
      //             />
      //             <SelectListGroup
      //               placeholder="daysperweek"
      //               name="daysperweek"
      //               value={this.state.daysperweek}
      //               onChange={this.onChange}
      //               options={optdaysperweek}
      //               error={errors.daysperweek}
      //               info="Give us an idea of your daysperweek"
      //             />
      //             <SelectListGroup
      //               placeholder="studentgender"
      //               name="studentgender"
      //               value={this.state.studentgender}
      //               onChange={this.onChange}
      //               options={optstudentgender}
      //               error={errors.studentgender}
      //               info="Give us an idea of your studentgender"
      //             />
      //             <SelectListGroup
      //               placeholder="salaryrange"
      //               name="salaryrange"
      //               value={this.state.salaryrange}
      //               onChange={this.onChange}
      //               options={optsalaryrange}
      //               error={errors.salaryrange}
      //               info="Give us an idea of your salaryrange"
      //             />
      //             <SelectListGroup
      //               placeholder="tutorgender"
      //               name="tutorgender"
      //               value={this.state.tutorgender}
      //               onChange={this.onChange}
      //               options={opttutorgender}
      //               error={errors.tutorgender}
      //               info="Give us an idea of your tutorgender"
      //             />
      //             <TextFieldGroup
      //               name="address"
      //               //"*" for is required
      //               placeholder="* address"
      //               value={this.state.address}
      //               error={errors.address}
      //               onChange={this.onChange}
      //               info="address in which student is studying"
      //               label="address"
      //             />
      //             <TextFieldGroup
      //               name="mobile"
      //               //"*" for is required
      //               placeholder="* mobile"
      //               value={this.state.mobile}
      //               error={errors.mobile}
      //               onChange={this.onChange}
      //               info="mobile in which student is studying"
      //               label="mobile"
      //             />
      //             <TextFieldGroup
      //               name="email"
      //               //"*" for is required
      //               placeholder="* email"
      //               value={this.state.email}
      //               error={errors.email}
      //               onChange={this.onChange}
      //               info="email in which student is studying"
      //               label="email"
      //             />
      //             <input
      //               type="submit"
      //               value="Submit"
      //               className="btn btn-info btn-block mt-4"
      //             />
      //           </form>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>

      <div class="container">
        <form class="well form-horizontal">
          <fieldset>
            <div class="form-group">
              <label class="col-md-4 control-label">Full Name</label>
              <div class="col-md-8 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-user"></i>
                  </span>
                  <input
                    id="fullName"
                    name="fullName"
                    placeholder="Full Name"
                    class="form-control"
                    required="true"
                    value=""
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">Address Line 1</label>
              <div class="col-md-8 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-home"></i>
                  </span>
                  <input
                    id="addressLine1"
                    name="addressLine1"
                    placeholder="Address Line 1"
                    class="form-control"
                    required="true"
                    value=""
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">Address Line 2</label>
              <div class="col-md-8 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-home"></i>
                  </span>
                  <input
                    id="addressLine2"
                    name="addressLine2"
                    placeholder="Address Line 2"
                    class="form-control"
                    required="true"
                    value=""
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">City</label>
              <div class="col-md-8 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-home"></i>
                  </span>
                  <input
                    id="city"
                    name="city"
                    placeholder="City"
                    class="form-control"
                    required="true"
                    value=""
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">
                State/Province/Region
              </label>
              <div class="col-md-8 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-home"></i>
                  </span>
                  <input
                    id="state"
                    name="state"
                    placeholder="State/Province/Region"
                    class="form-control"
                    required="true"
                    value=""
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">Postal Code/ZIP</label>
              <div class="col-md-8 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-home"></i>
                  </span>
                  <input
                    id="postcode"
                    name="postcode"
                    placeholder="Postal Code/ZIP"
                    class="form-control"
                    required="true"
                    value=""
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">Country</label>
              <div class="col-md-8 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-list"></i>
                  </span>
                  <select class="selectpicker form-control">
                    <option>
                      A really long option to push the menu over the edget
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">Email</label>
              <div class="col-md-8 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-envelope"></i>
                  </span>
                  <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    class="form-control"
                    required="true"
                    value=""
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-4 control-label">Phone Number</label>
              <div class="col-md-8 inputGroupContainer">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="glyphicon glyphicon-earphone"></i>
                  </span>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    class="form-control"
                    required="true"
                    value=""
                    type="text"
                  ></input>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
export default RequestTution;
