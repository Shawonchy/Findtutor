const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Userschema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  avatar: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  ispremium: {
    type: Boolean,
    default: false
  }
});

var User = mongoose.model("user", Userschema);
module.exports = User;
