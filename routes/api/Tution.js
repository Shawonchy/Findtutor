const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const RequestForTutor = require("../../models/RequestForTutor");
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

module.exports = router;
