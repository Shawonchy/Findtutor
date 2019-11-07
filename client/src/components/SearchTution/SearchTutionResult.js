import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../Common/Spinner";
import TutionItems from "../Tutions/TutionItems";
class SearchTutionResult extends Component {
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
    //for pagenation
    const { currentPage, postperpage } = this.state;
    const { tutions, loading } = this.props.tution;
    // Logic for displaying todos
    const indexOfLastPost = currentPage * postperpage;
    const indexOfFirstPost = indexOfLastPost - postperpage;

    const { isAuthenticated } = this.props.auth;
    let tutionItems;
    let pagenateitem;
    if (tutions === null || loading) {
      tutionItems = <Spinner />;
      pagenateitem = <Spinner />;
    } else {
      //for pagenation
      const currentTutions = tutions.slice(indexOfFirstPost, indexOfLastPost);
      //console.log(tutions.length);
      //console.log(typeof tutions);
      if (currentTutions.length > 0) {
        // console.log(typeof currentTutions);
        // console.log(currentTutions.length);
        // console.log(currentTutions);
        tutionItems = currentTutions.map(tution => (
          //tution property is sent to tutionItems component
          <TutionItems
            key={tution._id}
            tution={tution}
            isAuthenticated={isAuthenticated}
          />
        ));

        // Logic for displaying page numbers
        //pagenation
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(tutions.length / postperpage); i++) {
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
        tutionItems = <h4>No tutions found</h4>;
      }
    }

    return (
      <div>
        <div className="tutions">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <h1 className="display-4 text-center">Tutions</h1>
                <p className="lead text-center">Browse and findTutions</p>

                {tutionItems}
                {pagenateitem}
              </div>
              <div class="colmd-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchTutionResult.propTypes = {
  tution: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tution: state.tution,
  auth: state.auth
});

export default connect(mapStateToProps)(SearchTutionResult);
