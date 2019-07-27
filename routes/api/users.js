const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const router = express.Router();
const User = require("../../models/User");
const Token = require("../../models/verification_token");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const EmailVerifyService = require("../../config/EmailVerifyService");
router.get("/test", (req, res) => res.json({ msg: "user works" }));

//@api/users/register
router.post("/register", (req, res) => {
  //check validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
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
            .then(user => {
              // Create a verification token for this user
              const newmail_token = new Token({
                _userId: user._id,
                token: crypto.randomBytes(16).toString("hex")
              });
              // Save the verification token
              newmail_token
                .save()
                .then(token => {
                  // Send the email
                  var transporter = nodemailer.createTransport({
                    service: "Sendgrid",
                    auth: {
                      user: EmailVerifyService.username,
                      pass: EmailVerifyService.password
                    }
                  });
                  var mailOptions = {
                    from: "admin@findtutor.com",
                    to: user.email,
                    subject: "Account Verification Token",
                    text:
                      "Hello,\n\n" +
                      "Please verify your account by clicking the link: \nhttp://" +
                      "localhost:3000/confirmation/" +
                      newmail_token.token +
                      ".\n"
                  };
                  transporter.sendMail(mailOptions, function(err) {
                    if (err) {
                      return res.status(500).send({ msg: err.message });
                    }
                    res
                      .status(200)
                      .send(
                        "A verification email has been sent to " +
                          user.email +
                          "."
                      );
                  });
                })
                .catch(err => console.log(err));

              return res.json(user);
            })
            .catch(err => console.log(err));
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

  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matches
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //jwt payload
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
//email verify token confirmation
router.post("/confirmation", (req, res) => {
  const restoken = {
    token: false
  };
  const token = req.body.token;
  Token.findOne({ token: token }, function(err, token) {
    if (!token)
      return res.status(400).json({ msg: "token expires or wrong token" });

    // If we found a token, find a matching user
    User.findOne({ _id: token._userId }, function(err, user) {
      if (!user)
        return res
          .status(400)
          .send({ msg: "We were unable to find a user for this token." });
      if (user.isVerified)
        return res.status(200).send({
          type: "already-verified",
          msg: "This user has already been verified."
        });

      // Verify and save the user
      user.isVerified = true;
      user.save(function(err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        restoken.token = true;
        res.status(200).send(restoken.token);
        //res.status(200).json();
      });
    });
  });
});

module.exports = router;
