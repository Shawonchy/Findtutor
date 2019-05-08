const express = require("express");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const router = express.Router();
const User = require("../../models/User.js");

router.get("/test", (req, res) => res.json({ msg: "user works" }));

router.post("/register", (req, res) => {
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
          // Store hash in your password DB.
          newUser.password = hash;
          newUser
            .save()
            .then(User, () => res.json(User))
            .catch(err, () => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then(User => {
    if (!User) {
      return res.status(404).json({ msg: "user not found" });
    }
    bcrypt.compare(password, User.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "sucess" });
      } else {
        res.status(404).json({ password: "incorrect password" });
      }
    });
  });
});
module.exports = router;
