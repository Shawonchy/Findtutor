const validator = require("validator");
const isEmpty = require("./is-empty"); //importing isEmpty function

module.exports = function validateeducationInput(data) {
  let errors = {};
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.institute = !isEmpty(data.institute) ? data.institute : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  //data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.degree)) {
    //"isEmpty"=function from validator and takes string
    errors.degree = "degree is required";
  }
  if (validator.isEmpty(data.institute)) {
    errors.institute = "institute is required";
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "fieldofstudy is required";
  }
  // if (validator.isEmpty(data.to)) {
  //   errors.to = "to is required";
  // }
  if (validator.isEmpty(data.from)) {
    errors.from = "result is required";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors) //"isEmpty"=empty function that is imported
  };
};
