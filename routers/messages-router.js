"use strict"

const express = require("express");
const router = express.Router();
const room = require("../models/rooms.js");
const message = require("../models/messages.js");

router.route("/chatrooms")
    .get((req, res) => {
        room.find({}).exec()
            .then((data) => {
                res.render("chat", {
                    rooms: data
                });
            }).catch((err) => {
                console.log("error");
            });
    });

router.route("/chatrooms/:room/messages")
    .get((req, res) => {
        let room = req.params.room;
        message.find({
                room: room
            }).exec()
            .then((data) => {
                res.send(data);
                res.end();
            })
            .catch((error) => {
                console.log("error");
            });
    })
    .delete((req, res) => {
        message.remove({
                room: req.body.room
            }).exec()
            .then((data) => {
                res.end();
            }).catch((error) => {
                console.log("error");
            });
    });

module.exports = router;