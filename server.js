const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const post = require("./routes/api/post");

const app = express();
app.get("/", (req, res) => res.send("hello"));

//bodyparser module
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/post", post);

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("database connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening to port ${port}"));
