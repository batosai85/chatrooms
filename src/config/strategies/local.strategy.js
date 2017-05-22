"use strict"

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const user = require("../../../models/users.js");
const checkUser = require("../../../vars.js");

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: "logusername",
        passwordField: "logpassword"
    }, function (username, password, done) {
        user.findOneAndUpdate({
            username: username,
            password: password
        }, {
            $set: {
                login: "online"
            }
        }, {
            $upsert: true
        }, function (err, data) {
            if (err) {
                done(null, false);
            } else {
                if (data === null) {
                    checkUser.userExist = "User don't exist :("
                } else {
                    checkUser.userExist = "";
                }
                let user = data;
                done(null, user);
            }
        })
    }));
}