const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RequestForTutorSchema = new Schema({
  title: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  division: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  upazila: {
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
    type: [String],
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
  },
  instruction: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: false
  },
  posted_at: { type: Date, default: Date.now },
  tutor_assigned: {
    type: Schema.Types.ObjectId,
    ref: "profile" //refered collection name
  }
});
//Sets the posted_at parameter equal to the current time
RequestForTutorSchema.pre("save", function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});
module.exports = RequestForTutor = mongoose.model(
  "requestfortutor",
  RequestForTutorSchema
);
