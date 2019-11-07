// tutions applied by tutors

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const ApplyTution = require("../../models/ApplyTution");
const User = require("../../models/User");
//@api/applytution/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const ApplyTutionFields = {
      tutor: {}
    };
    //ApplyTutionFields.tutor.id = req.user.id;
    ApplyTutionFields.tution = req.body.tution._id;
    ApplyTutionFields.tutor = req.body.profile._id;

    ApplyTution.findOne({ tution: req.body.tution._id }).then(applytution => {
      if (applytution) {
        applytution.tutor.push(req.body.profile._id);
        // ApplyTution.update(
        //   { _id: applytution._id },
        //   {
        //     $push: { tutor: { id: req.user.id, profile: req.body.profile._id } }
        //   }
        // );
        applytution.save();
        res.json({ msg: "added to array" });
      } else {
        new ApplyTution(ApplyTutionFields)
          .save()
          .then(applytution => res.json(applytution))
          .catch(err => res.json(err));
      }
    });

    User.findOne({ _id: req.user.id }).then(user => {
      if (user) {
        user.application.push(req.body.tution._id);
        user.save();
      }
    });
  }
);

//get info about all tutions applied by tutors
//@api/applytution/all-applied-tutions
router.get("/all-applied-tutions", (req, res) => {
  ApplyTution.find()
    .populate({ path: "tutor", model: "profile" })
    .then(applytutions => {
      if (!applytutions) {
        res.status(404).json({ msg: "No applied tutions is found" });
      } else {
        res.status(200).json(applytutions);
      }
    })
    .catch(err => res.status(404).json(err));
});
//get all the tutor applied for a tution id
//@api/applytution/tutors-applied-foratution
router.post("/tutors-applied-foratution", (req, res) => {
  ApplyTution.findOne({ tution: req.body.tution_id })
    .populate({ path: "tutor", model: "profile" })
    .then(applytutions => {
      if (!applytutions) {
        res.status(404).json({ msg: "No applied tutions is found" });
      } else {
        res.status(200).json(applytutions.tutor);
      }
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
