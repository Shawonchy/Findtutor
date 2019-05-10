const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../models/User");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //extract data from token

opts.secretOrKey = keys.secretOrkeys;
//passport strategy
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(User => {
          if (User) {
            return done(null, User);
          } else {
            return done(null, false);
          }
        })
        .catch(err => console.log(err));
    })
  );
};
