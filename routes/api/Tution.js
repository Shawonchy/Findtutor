const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const RequestForTutor = require("../../models/RequestForTutor");
const User = require("../../models/User");
const passport = require("passport");
//@api/tution/all
router.get("/all", (req, res) => {
  const errors = {};
  RequestForTutor.find()
    .then(requestfortutors => {
      if (!requestfortutors) {
        errors.error = "No tutions is found";
        res.status(404).json(errors);
      } else {
        res.json(requestfortutors);
      }
    })
    .catch(err => {
      res.status(404).json(err);
    });
});
//get  tutions applied by a user
//@api/tution/applied-tution
router.get(
  "/applied-tution",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    User.findOne({ _id: req.user.id })
      .populate("application") //explore application field of user collection
      .then(user => {
        if (!user.application) {
          //res.json(user.application);
          errors.error = "No tutions is found";
          res.status(404).json(errors);
        } else {
          res.json(user.application);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);
//api/tution/id/:id

router.get("/id/:id", (req, res) => {
  const errors = {};
  RequestForTutor.findOne({ _id: req.params.id })
    .then(requestfortutors => {
      if (!requestfortutors) {
        errors.error = "No tution is found by this id";
        res.status(404).json(errors);
      } else {
        res.json(requestfortutors);
      }
    })
    .catch(err => res.status(404).json(err));
});

//api/tution/search-tution
//desc@search a tution in a specific location
router.post("/search-tution", (req, res) => {
  const errors = {};
  RequestForTutor.find({
    division: req.body.division,
    district: req.body.district,
    upazila: req.body.upazila
  })
    .then(requestfortutors => {
      if (!requestfortutors) {
        errors.error = "No tutions is found";
        res.status(404).json(errors);
      } else {
        res.json(requestfortutors);
      }
    })
    .catch(err => res.json(err));
});

module.exports = router;
