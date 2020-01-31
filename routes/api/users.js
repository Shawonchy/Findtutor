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
const stripe = require("stripe")("sk_test_9y2zyOxGLQrHq0TemNwWwC1700Mq7D29mF");
const cors = require("cors");
const uuid = require("uuid/v4");
router.get("/test", (req, res) => res.json({ msg: "user works" }));

//@api/users/registerclear

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
              // // Create a verification token for this user
              // const newmail_token = new Token({
              //   _userId: user._id,
              //   token: crypto.randomBytes(16).toString("hex")
              // });
              // // Save the verification token
              // newmail_token
              //   .save()
              //   .then(token => {
              //     // Send the email
              //     var transporter = nodemailer.createTransport({
              //       service: "Sendgrid",
              //       auth: {
              //         user: EmailVerifyService.username,
              //         pass: EmailVerifyService.password
              //       }
              //     });
              //     var mailOptions = {
              //       from: "admin@findtutor.com",
              //       to: user.email,
              //       subject: "Account Verification Token",
              //       text:
              //         "Hello,\n\n" +
              //         "Please verify your account by clicking the link: \nhttp://" +
              //         "localhost:3000/confirmation/" +
              //         newmail_token.token +
              //         ".\n"
              //     };
              //     transporter.sendMail(mailOptions, function(err) {
              //       if (err) {
              //         return res.status(500).send({ msg: err.message });
              //       }
              //       res
              //         .status(200)
              //         .send(
              //           "A verification email has been sent to " +
              //             user.email +
              //             "."
              //         );
              //     });
              //   })
              //   .catch(err => console.log(err));

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

  User.findOne({ email: email, isVerified: true }).then(user => {
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User not found or User is not verified" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matches
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          isVerified: user.isVerified,
          ispremium: user.ispremium,
          phone: user.phone,
          email: user.email
        }; //jwt payload
        jwt.sign(
          payload,
          keys.secretOrkeys,
          { expiresIn: 3600 }, //after 3600ms the token will be expired
          (err, token) => {
            res.json({
              msg: true,
              token2: "Bearer " + token //"bearer"=protocols
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

//deleting a user
router.delete("/delete-user/:id", (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then(doc => {
      if (!doc) {
        res.status(200).json({ msg: "deleted successfully" });
      }
    })
    .catch(err => console.log(err));
});
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
        res.status(200).json(restoken);
        //res.status(200).json();
      });
    });
  });
});
//get current tutions
//@/api/users/current-tutions

router.get(
  "/current-tutions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id })
      .populate("currenttution")
      .then(user => res.json(user.currenttution))
      .catch(err => res.json(err));
  }
);

//tutor category update and handle stripe payment transection
router.post("/update-tutor-type", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { userinfo, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();

    //changing the visa card and store info in stripes account
    const charge = await stripe.charges.create(
      {
        amount: userinfo.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";

    User.findOne({ _id: userinfo.id }, function(err, user) {
      if (user.ispremium) {
        return res.status(200).json({ msg: "already premium tutor" });
      } else {
        user.ispremium = true;
      }
      user
        .save()
        .then(user => res.json(user))
        .catch(err => res.json(err));
    });
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }
  res.json({ error, status });
});

module.exports = router;
