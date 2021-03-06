import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  name,
  label,
  value,
  error,
  info,
  onChange,
  options
}) => {
  //options array that is sent contains all the options in array mapped to the options to show in the select list
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    // <div className="form-group">
    //   <select
    //     className={classnames("form-control form-control-lg", {
    //       "is-invalid": error
    //     })}
    //     name={name}
    //     value={value}
    //     onChange={onChange}
    //   >
    //     {selectOptions}
    //   </select>
    //   {info && <small className="form-text text-muted">{info}</small>}
    //   {error && <div className="invalid-feedback">{error}</div>}
    // </div>
    <div className="form-group">
      <label className="control-label">{label}</label>
      <div className="inputGroupContainer">
        <div className="input-group">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-list"></i>
          </span>
          <select
            className="selectpicker form-control"
            className={classnames("form-control form-control-lg", {
              "is-invalid": error
            })}
            name={name}
            value={value}
            onChange={onChange}
          >
            {selectOptions}
          </select>
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
