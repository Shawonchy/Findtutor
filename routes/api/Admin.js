const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const router = express.Router();
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
//@api/admin/register
//private route for registering admin;
router.post("/register", (req, res) => {
  //check validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({ email: req.body.email }).then(admin => {
    if (admin) {
      res.json({ email: "email is exisred" });
    } else {
      const newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
      });

      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(newAdmin.password, salt, function(err, hash) {
          if (err) throw err;
          // Store hash password in DB.
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(admin => {
              res.json(admin);
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    }
  });
});
//login admin
//@api/admin/login

router.post("/login", (req, res) => {
  //check validation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({ email: email }).then(admin => {
    if (!admin) {
      return res
        .status(404)
        .json({ msg: "admin not found or admin is not verified" });
    }
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        //admin matches
        const payload = {
          id: admin.id,
          name: admin.name,
          isSuper: admin.isSuper,
          phone: admin.phone,
          email: admin.email
        }; //jwt payload
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

//get all admins
//@api/admin/get_allAdmins
router.get("/get_allAdmins", (req, res) => {
  Admin.find()
    .then(admins => {
      res.json(admins);
    })
    .catch(err => console.log(err));
});

//get all
//@api/admin/get_allUsers
router.get("/get_allUsers", (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
});

module.exports = router;
