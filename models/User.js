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
  }
});

var User = mongoose.model("User", Userschema);
module.exports = User;
