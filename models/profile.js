const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user" //refered collection name
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  experience: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  education: [
    {
      degree: {
        type: String,
        required: true
      },
      institute: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        required: true
      },
      description: {
        type: String
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
  },

  tution_info: {
    expected_min_salary: {
      type: String
    },
    current_Status_for_Tuition: {
      type: String
    },
    days_per_week: {
      type: String
    },
    preferred_class: {
      type: String
    },
    preffered_subject: {
      type: String
    },
    preffered_medium: {
      type: String
    },
    preffered_areas: {
      type: String
    }
  },
  img: {
    contentType: {
      type: String
    },
    data: {
      type: Buffer
    }
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
