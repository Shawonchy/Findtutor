const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Profile = require("../../models/profile");
const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");
const validateeducationInput = require("../../validation/education");
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

//@api/profile/
//checking if the current user has a profile created or not
//access:protected
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.profile = "this user has not created profile";
          res.status(404).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch(err => res.json(err));
  }
);

//@api/profile/handle/:handle
//desc:getting a profile from a given handle
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle }) //getting the handle from url
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.handle = "no profile found for this handle";
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err => res.status(404).json(err));
});

//@api/profile/user_id/:user_id
//desc:getting a profile from a given user_id
router.get("/user_id/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user_id: req.params.user_id }) //getting the user_id from url
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.user_id = "no profile found for this user_id";
        res.status(404).json(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err => res.status(404).json(err));
});

//@api/profile/all
//desc:getting all the profiles
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find() //find all the profiles
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      //'profiles'=all the profiles not a single profile
      if (!profiles) {
        errors.handle = "no profile found for this handle";
        res.status(404).json(errors);
      } else {
        res.json(profiles);
      }
    })
    .catch(err => res.status(404).json(err));
});

//@api/profile/education
//desc:create or update a education of current user by providing authorization token
//access:protected
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateeducationInput(req.body);
    //validation check
    if (!isValid) {
      res.status(404).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        errors.noprofile = "no profile found";
        res.status(404).json(errors);
      }
      const nweducation = {
        exam: req.body.exam,
        institute: req.body.institute,
        subject: req.body.subject,
        result: req.body.result,
        year: req.body.year
      };
      //add to education array
      profile.education.unshift(nweducation);

      profile
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(err => res.json(err));
    });
  }
);

//@api/profile/
//desc:create or update a profile of current user by providing authorization token
//access:protected
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    //const errors = {};
    const profilefields = {};
    profilefields.user = req.user.id;
    if (req.body.handle) profilefields.handle = req.body.handle;
    if (req.body.location) profilefields.location = req.body.location;
    if (req.body.experience) profilefields.experience = req.body.experience;
    if (req.body.status) profilefields.status = req.body.status;
    //split skills into array
    if (typeof req.body.skills !== "undefined") {
      profilefields.skills = req.body.skills.split(",");
    }

    profilefields.social = {};
    if (req.body.facebook) profilefields.social.facebook = req.body.facebook;
    if (req.body.google) profilefields.social.google = req.body.google;
    if (req.body.twitter) profilefields.social.twitter = req.body.twitter;

    Profile.findOne({ user: req.user.id }).then(profile => {
      //user.id comes from token
      if (profile) {
        //update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefields },
          { new: true }
        ).then(profile => {
          res.json(profile);
        });
      } else {
        //create profile
        //match handle if it exists
        Profile.findOne({ handle: profilefields.handle }).then(profile => {
          if (profile) {
            errors.handle = "that handle already exists";
            res.status(400).json(errors);
          }
          //save profile
          new Profile(profilefields)
            .save()
            .then(profile => res.json(profile))
            .catch(err => console.log(err));
        });
      }
    });
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
