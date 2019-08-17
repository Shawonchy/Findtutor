const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const EmailVerifyService = require("../../config/EmailVerifyService");

router.post("/", (req, res) => {
  const { email1, email2, info } = req.body;
  // Send the email
  var transporter = nodemailer.createTransport({
    service: "Sendgrid",
    auth: {
      user: EmailVerifyService.username,
      pass: EmailVerifyService.password
    }
  });
  var mailOptions = {
    from: email1,
    to: email2,
    subject: "A user wants to connect",
    text: info
  };
  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
    res.status(200).send("A verification email has been sent to");
  });
});
module.exports = router;
