const validator = require("validator");
const isEmpty = require("./is-empty"); //importing isEmpty function

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    //"isEmpty"=function from validator and takes string
    errors.email = "email is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors) //"isEmpty"=empty function that is imported
  };
};
