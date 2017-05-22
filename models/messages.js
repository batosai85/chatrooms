const mongoose = require("mongoose");
const message = new mongoose.Schema({
    message: {
        type: String,
        trim: true,
        require: true
    },
    room: {
        type: String,
        trim: true,
        require: true
    },
    user: {
        type: String,
        trim: true,
        require: true
    }
}, {
    collection: "messages"
});

module.exports = mongoose.model("message", message);