const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const user = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    confpassword: {
        type: String,
        require: true,
        trim: true
    },
    login: {
       type : String
    },
    role : {
       type : String
}
}, {
    collection: "users"
});

user.plugin(uniqueValidator);
module.exports = mongoose.model("user", user);