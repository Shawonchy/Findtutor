const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplyTutionSchema = new Schema({
  tution: {
    type: Schema.Types.ObjectId,
    ref: "requestfortutor" //refered collection name
  },
  tutor: [
    {
      type: Schema.Types.ObjectId,
      ref: "profile"
    }
  ]
});
module.exports = ApplyTution = mongoose.model("applytution", ApplyTutionSchema);
