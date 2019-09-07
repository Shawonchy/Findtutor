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
  // const { errors, isValid } = validateRequestTutorInput(req.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const requesttutorfields = {};
  if (req.body.name) requesttutorfields.name = req.body.name;
  if (req.body.division) requesttutorfields.division = req.body.division;
  if (req.body.district) requesttutorfields.district = req.body.district;
  if (req.body.upazila) requesttutorfields.upazila = req.body.upazila;
  if (req.body.medium) requesttutorfields.medium = req.body.medium;
  if (req.body.class) requesttutorfields.class = req.body.class;
  if (req.body.subject1) requesttutorfields.subject1 = req.body.subject1;
  //if (req.body.subject) requesttutorfields.subject = req.body.subject;
  //split skills into array
  if (typeof req.body.subject !== "undefined") {
    requesttutorfields.subject = req.body.subject.split(",");
  }

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
  if (req.body.instruction)
    requesttutorfields.instruction = req.body.instruction;
  const newRquestForTutor = RquestForTutor(requesttutorfields);

  // newRquestForTutor.pre("save", function(next) {
  //   now = new Date();
  //   this.updated_at = now;
  //   if (!this.created_at) {
  //     this.created_at = now;
  //   }
  //   next();
  // });

  newRquestForTutor
    .save()
    .then(requestfortutor => res.json(requestfortutor))
    .catch(err => console.log(err));
});
module.exports = router;
