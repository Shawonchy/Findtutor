const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const RquestForTutor = require("../../models/RequestForTutor");
const validateRequestTutorInput = require("../../validation/RequestForTutor");

//@api/request-a-tutor
//posting for request for a tutor
//access:public

router.post("/", (req, res) => {
  //check validation
  const { errors, isValid } = validateRequestTutorInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const requesttutorfields = {};
  if (req.body.name) requesttutorfields.name = req.body.name;
  if (req.body.location) requesttutorfields.location = req.body.location;
  if (req.body.medium) requesttutorfields.medium = req.body.medium;
  if (req.body.class) requesttutorfields.class = req.body.class;
  if (req.body.subject) requesttutorfields.subject = req.body.subject;
  if (req.body.institute) requesttutorfields.institute = req.body.institute;
  if (req.body.daysperweek)
    requesttutorfields.daysperweek = req.body.daysperweek;
  if (req.body.studentgender)
    requesttutorfields.studentgender = req.body.studentgender;
  if (req.body.salaryrange)
    requesttutorfields.salaryrange = req.body.salaryrange;
  if (req.body.tutorgender)
    requesttutorfields.tutorgender = req.body.tutorgender;
  if (req.body.address) requesttutorfields.address = req.body.address;
  if (req.body.mobile) requesttutorfields.mobile = req.body.mobile;
  if (req.body.email) requesttutorfields.email = req.body.email;

  const newRquestForTutor = RquestForTutor(requesttutorfields);

  newRquestForTutor
    .save()
    .then(requestfortutor => res.json(requestfortutor))
    .catch(err => console.log(err));
});
module.exports = router;
