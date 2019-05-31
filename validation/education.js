const validator = require("validator");
const isEmpty = require("./is-empty"); //importing isEmpty function

module.exports = function validateeducationInput(data) {
  let errors = {};
  data.exam = !isEmpty(data.exam) ? data.exam : "";
  data.institute = !isEmpty(data.institute) ? data.institute : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";
  data.result = !isEmpty(data.year) ? data.year : "";
  data.result = !isEmpty(data.result) ? data.result : "";

  if (validator.isEmpty(data.exam)) {
    //"isEmpty"=function from validator and takes string
    errors.exam = "exam is required";
  }
  if (validator.isEmpty(data.institute)) {
    errors.institute = "institute is required";
  }
  if (validator.isEmpty(data.subject)) {
    errors.subject = "subject is required";
  }
  if (validator.isEmpty(data.year)) {
    errors.year = "year is required";
  }
  if (validator.isEmpty(data.result)) {
    errors.result = "result is required";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors) //"isEmpty"=empty function that is imported
  };
};
