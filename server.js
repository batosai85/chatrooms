"use strict"

const express = require("express");
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;
const io = require('socket.io').listen(app.listen(3000));
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const roomsRouter = require("./routers/rooms-router.js");
const messagesRouter = require("./routers/messages-router.js");
const userauthRouter = require("./routers/userauth-router.js");
const usersRouter = require("./routers/users-router.js");

app.use(cors());

app.use(function (req, res, next) {
    req.io = io;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
require("./src/config/passport.js")(app);

app.set("view engine", "jade");
app.set("views", "./public/views");

app.use("/bootstrap", express.static(__dirname + `/node_modules/bootstrap/dist`));
app.use("/jquery", express.static(__dirname + `/node_modules/jquery/dist`));
app.use("/toastr", express.static(__dirname + `/bower_components/toastr`));
app.use("/dist", express.static(__dirname + `/build`));
app.use("/", express.static(__dirname + `/public`));




mongoose.Promise = require('q').Promise;;

const db = `mongodb://chatrooms:chatrooms@ds013991.mlab.com:13991/chatrooms`;
const options = {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};
mongoose.connect(db, options);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

mongoose.connection.once('open', function () {

    require("./routers/socket.js")(io);
    app.use(userauthRouter);
    app.use((req, res, next) => {
        if (req.isAuthenticated()) {
            res.locals.user = req.user;
            next();
            return;
        }
        res.redirect("/login");
    });
    app.use(roomsRouter);
    app.use(messagesRouter);
    app.use(usersRouter);


});