"use strict"

const express = require("express");
const router = express.Router();
const room = require("../models/rooms.js");
const message = require("../models/messages.js");

router.route("/home")
    .get((req, res) => {
        room.find({}).exec()
            .then((data) => {
                res.render("home", {
                    rooms: data
                });
            }).catch((err) => {
                res.send("error");
            });
    })
    .delete((req, res) => {
        if (res.locals.user.role !== "admin") {
            res.redirect("/home");
        } else {
            let id = req.body.room;
            room.findOneAndRemove({
                name: id
            }).then((data) => {
                message.remove({
                        room: id
                    }).exec()
                    .then((data) => {
                        res.end();
                    }).catch((error) => {
                        res.send("error");
                    });
                res.end();
            }).catch((err) => {
                res.send("error");
            });
        }
    });

router.route("/create")
    .get((req, res) => {
        res.render("create");
    })
    .post((req, res) => {
        let newRoom = new room();
        newRoom.name = req.body.name;
        newRoom.description = req.body.description;

        newRoom.save().then((data) => {
            res.end();
        }).catch((err) => {
            res.send("error");
        });
    });

router.route("/edit/:room")
    .get((req, res) => {
        if (res.locals.user.role !== "admin") {
            res.redirect("/home");
        } else {
            let id = req.params.room.split("-");
            res.render("edit", {
                name: id[0],
                description: id[1]
            });
        }
    })
    .put((req, res) => {
        room.findOneAndUpdate({
            name: req.body.oldName,
            description: req.body.oldDescription
        }, {
            $set: {
                name: req.body.name,
                description: req.body.description
            }
        }, {
            upsert: true
        }).then((data) => {
            res.send("data");
            res.end();
        }).catch((error) => {
            res.send("error");
            res.end();
        });
    });

module.exports = router;