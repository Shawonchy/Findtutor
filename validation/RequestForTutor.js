const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRequestTutorInput(data) {
  let errors = {};
  //check if name filled is empty then name will be empty string otherwise neme will be name that is provided
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.medium = !isEmpty(data.medium) ? data.medium : "";
  data.class = !isEmpty(data.class) ? data.class : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";
  data.daysperweek = !isEmpty(data.daysperweek) ? data.daysperweek : "";
  data.studentgender = !isEmpty(data.studentgender) ? data.studentgender : "";
  data.salaryrange = !isEmpty(data.salaryrange) ? data.salaryrange : "";
  data.tutorgender = !isEmpty(data.tutorgender) ? data.tutorgender : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "name must be between 2 and 30 charecters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "name is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "email is invaild";
  }
  if (validator.isEmpty(data.location)) {
    errors.location = "location is required";
  }
  if (validator.isEmpty(data.medium)) {
    errors.medium = "medium is required";
  }
  if (validator.isEmpty(data.class)) {
    errors.class = "class is required";
  }
  if (validator.isEmpty(data.subject)) {
    errors.subject = "subject is required";
  }
  if (validator.isEmpty(data.daysperweek)) {
    errors.daysperweek = "daysperweek is required";
  }
  if (validator.isEmpty(data.studentgender)) {
    errors.studentgender = "studentgender is required";
  }
  if (validator.isEmpty(data.salaryrange)) {
    errors.salaryrange = "salaryrange is required";
  }
  if (validator.isEmpty(data.tutorgender)) {
    errors.tutorgender = "tutorgender is required";
  }
  if (validator.isEmpty(data.address)) {
    errors.address = "address is required";
  }
  if (validator.isEmpty(data.mobile)) {
    errors.mobile = "mobile is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors) //"isEmpty"=empty function that is imported
  };
};
