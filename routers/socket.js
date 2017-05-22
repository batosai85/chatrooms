"use strict"

const message = require("../models/messages.js");
const user = require("../models/users.js");
const room = require("../models/rooms.js");

module.exports = (io) => {
    io.sockets.on("connection", function (socket) {

        socket.on("new_message", function (data) {
            let newMessage = new message();
            newMessage.room = data.name;
            newMessage.message = data.message;
            newMessage.user = data.username;
            newMessage.save()
                .then((data) => {
                    io.sockets.emit("get_new_message", newMessage);
                }).catch((err) => {
                    throw err;
                });
        });

        socket.on("login", function (data) {
            io.sockets.emit("user_login", data);
        });

        socket.on("delete_messages", function (data) {
            io.sockets.emit("confirm_delete", data);
        });

        socket.on("logout", function (data) {
            io.sockets.emit("user_logout", data);
        });

        user.find({
                login: "online"
            }).exec()
            .then((data) => {
                socket.emit("users_online", data);
            }).catch((error) => {
                throw error;
            });

        socket.on("update_on_login", function (data) {
            user.find({
                    login: "online"
                }).exec()
                .then((data) => {
                    io.sockets.emit("users_increase", data);
                }).catch((error) => {
                    throw error;
                });
        });
        socket.on("update_on_logout", function (data) {
            user.find({
                    login: "online"
                }).exec()
                .then((data) => {
                    io.sockets.emit("users_decrease", data);
                }).catch((error) => {
                    throw error;
                });
        });


        socket.on("room_deleted", function (data) {
            room.find({}).exec()
                .then((data) => {
                    io.sockets.emit("rooms_delete_update", data);
                }).catch((error) => {
                    throw error;
                });
        });
        socket.on("room_added", function (data) {
            room.find({}).exec()
                .then((data) => {
                    io.sockets.emit("rooms_add_update", data);
                }).catch((error) => {
                    throw error;
                });
        });
    });
}