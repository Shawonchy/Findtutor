const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var AdminSchema = new Schema({
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
  isSuper: {
    type: Boolean,
    default: false
  }
});
var Admin = mongoose.model("admin", AdminSchema);
module.exports = Admin;
