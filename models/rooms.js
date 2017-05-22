const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const room = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true
    }
}, {
    collection: "rooms"
});

room.plugin(uniqueValidator);
module.exports = mongoose.model("room", room);