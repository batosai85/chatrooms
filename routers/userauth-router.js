"use strict"

const express = require("express");
const router = express.Router();
const passport = require("passport");
const user = require("../models/users.js");
const checkUser = require("../vars.js");

router.route("/login")
    .get((req, res) => {
        res.render("login", {
            title: "Auth",
            userExist: checkUser.userExist,
            userEmpty: checkUser.userEmpty
        });
    })
    .post(passport.authenticate("local", {
        failureRedirect: "/login",
        successRedirect: "/home"
    }));

router.route("/user")
    .post((req, res) => {
        let newUser = new user();
        newUser.username = req.body.signusername;
        newUser.email = req.body.signemail;
        newUser.password = req.body.signpassword;
        newUser.confpassword = req.body.confpassword;
        newUser.login = "offline";
        newUser.role = "subscriber";
        newUser.save().then((data) => {
            res.end();
        }).catch((err) => {
            res.send("error");
        });
    });

router.route("/logout/:username")
    .get((req, res) => {
        user.findOneAndUpdate({
                username: req.params.username
            }, {
                $set: {
                    login: "offline"
                }
            }, {
                $upsert: true
            })
            .then((data) => {}).catch((error) => {
                console.log("error");
            });
        req.logout();
        res.redirect("/login");
});



module.exports = router;