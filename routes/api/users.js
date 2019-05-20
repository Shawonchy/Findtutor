const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const router = express.Router();
const User = require("../../models/User.js");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
router.get("/test", (req, res) => res.json({ msg: "user works" }));

router.post("/register", (req, res) => {
  //check validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(User => {
    if (User) {
      return res.status(400).json({ email: "email is existed" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        //new user created in db
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        avatar
      });
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
          if (err) throw err;
          // Store hash password in DB.
          newUser.password = hash;
          newUser
            .save()
            .then(User, () => res.json(User)) //
            .catch(err, () => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  //check validation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then(User => {
    if (!User) {
      return res.status(404).json({ msg: "user not found" });
    }
    bcrypt.compare(password, User.password).then(isMatch => {
      if (isMatch) {
        //user matches
        const payload = { id: User.id, name: User.name, avatar: User.avatar }; //jwt payload
        jwt.sign(
          payload,
          keys.secretOrkeys,
          { expiresIn: 3600 }, //after 3600ms the token will be expired
          (err, token) => {
            res.json({
              msg: true,
              token: "Bearer " + token //"bearer"=protocols
            });
          }
        );
      } else {
        res.status(404).json({ password: "incorrect password" });
      }
    });
  });
});

router.get(
  "/current",
  //authenticate with pasport
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
