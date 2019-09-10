const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const post = require("./routes/api/post");
const requestfortutor = require("./routes/api/RequestForTutor");
const tution = require("./routes/api/Tution");
const EmailTutor = require("./routes/api/EmailTutor");
const Adminpanel = require("./routes/api/AdminPanel");
const ApplyTution = require("./routes/api/ApplyTution");
//const token = require("./routes/api/token_confirm");

//for php
var execPHP = require("./execphp.js")();
execPHP.phpFolder = "E:\\tutor\\php\\";

const app = express();
app.get("/", (req, res) => res.send("hello"));

//bodyparser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("*.php", function(request, response, next) {
  execPHP.parseFile(request.originalUrl, function(phpResult) {
    response.write(phpResult);
    response.end();
  });
});
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("database connected"))
  .catch(err => console.log(err));

app.use(passport.initialize()); //passport middleware

require("./config/passport")(passport); //passport configure

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/post", post);
app.use("/api/request-a-tutor", requestfortutor);
app.use("/api/tution", tution);
app.use("/api/email-tutor", EmailTutor);
app.use("/admin", Adminpanel);
app.use("/api/applytution", ApplyTution);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening to port ${port}"));
