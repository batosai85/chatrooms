"use strict"

const express = require("express");
const router = express.Router();
const user = require("../models/users.js");

router.route("/all-users")
    .get((req, res) => {
        user.find({}).exec()
            .then((data) => {
                res.render("all-users", {
                    users: data
                });
            });
    })
    .delete((req, res) => {
        if (res.locals.user.role !== "admin") {
            res.redirect("/home");
        } else {
            let username = req.body.username;
            user.findOneAndRemove({
                username: username
            }).then((data) => {
                res.send("deleted");
                res.end();
            }).catch((err) => {
                res.send("error");
            });

        }
})

router.route("/edit-user/:user")
    .get((req,res) => {
    res.send("edit user"); 
    })
    .put((req,res) => {
    user.findOneAndUpdate({
        username : req.body.username
    },{$set : {
        role : req.body.role                
    }}, {upsert : true})
        .then((data) => {
        res.send(data.username);
        res.end();
    }).catch((error) => {
        res.send(null)
    });
});
router.route("/edit-profile/:user")
   .get((req,res) => {
      let $username = req.params.user;
      user.find({
          username : $username
      }).exec()
      .then((data) => {
          res.render("edit-profile",{
              user : data
          });
          res.end();
      })
      .catch((error) => {
         res.send("error");
      });
    })
    .put((req,res) => {
        user.findOneAndUpdate({
            username : req.body.editoldusername
        },{$set : {
            password : req.body.editpassword,
            confpassword : req.body.editconfpassword,
            username : req.body.editusername,
            email : req.body.editemail  
        }}, {upsert : true})
            .then((data) => {
            res.send("success");
            res.end();
        }).catch((error) => {
            res.send("error")
        });
});

module.exports = router;