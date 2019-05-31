const validator = require("validator");
const isEmpty = require("./is-empty"); //importing isEmpty function

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";


  if (!validator.isLength(data.handle,{min:6,max:40})) {
    errors.handle = "handle must be betwwen 6 and 40 charecter";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "status is required";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "skills is required";
  }

    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){

       errors.facebook='facebook url is not valid';

        }
    }
    if(!isEmpty(data.twitter)){
        if(!validator.isUrl(data.twitter)){

       errors.twitter='twitter url is not valid';

        }
    }
    if(!isEmpty(data.google)){
        if(!validator.isUrl(data.google)){

       errors.google='google url is not valid';

        }
    }
  return {
    errors: errors,
    isValid: isEmpty(errors) //"isEmpty"=empty function that is imported
  };
};
