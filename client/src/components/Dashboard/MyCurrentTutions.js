import React, { Component } from "react";
import axios from "axios";
import Tution from "../Tutions/Tution";
//var currentTutions = [];
class MyCurrentTutions extends Component {
  constructor() {
    super();
    this.state = {
      currentTutions: {}
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:5000/api/users/current-tutions")
      .then(res => {
        //currentTutions = res.data;
        this.setState({
          currentTutions: res.data
        });
        // console.log(typeof res.data);
        // console.log(typeof currentTutions);
        // console.log(currentTutions);
      })
      .catch(err => console.log(err));
  }
  render() {
    // mapping to education array and taking each arry index as edu
    const tutions = Object.keys(this.state.currentTutions).map((item, i) => (
      <tr key={i}>
        <td>{this.state.currentTutions[item]._id}</td>
        <td>{this.state.currentTutions[item].name}</td>
        <td>{this.state.currentTutions[item].class}</td>
        <td>{this.state.currentTutions[item].studentgender}</td>
        <td>{this.state.currentTutions[item].institute}</td>
      </tr>
    ));

    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="bg-light">Tution id</th>
            <th className="bg-light">Name</th>
            <th className="bg-light">Class</th>
            <th className="bg-light">Gender</th>
            <th className="bg-light">institute</th>
          </tr>
          {tutions}
        </thead>
      </table>

      //     </div>
      //   </div>
      // </div>
    );
  }
}
export default MyCurrentTutions;
