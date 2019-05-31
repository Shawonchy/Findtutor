const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"//refered collection name
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  experience: {
    type: String,
    
  },
  location: {
    type: String,
    
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  education: [
    {
      exam: {
        type: String,
        required: true
      },
      institute: {
        type: String,
        required: true
      },
      subject: {
        type: String,
        required: true
      },
      result: {
        type: String,
        required: true
      },
      year: {
        type: Number,
        required: true
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
