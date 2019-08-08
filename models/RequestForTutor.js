const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RequestForTutorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  medium: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  institute: {
    type: String
  },
  daysperweek: {
    type: String,
    required: true
  },
  studentgender: {
    type: String,
    required: true
  },
  salaryrange: {
    type: String,
    required: true
  },
  tutorgender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  email: {
    type: String
  }
});

module.exports = RequestForTutor = mongoose.model(
  "requestfortutor",
  RequestForTutorSchema
);
