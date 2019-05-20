const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  //check if name filled is empty then name will be empty string otherwise /////neme will be name that is provided
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "name must be between 2 and 30 charecters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "name is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "email is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "email is invaild";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "password2 is required";
  }
  if (validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be 6 charecter";
  }
  if (validator.equals(data.password, data.password2)) {
    errors.password2 = "password must match";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors) //"isEmpty"=empty function that is imported
  };
};
