"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// We import our App dependencies from npm installment.
var path = require("path");
var http = require("http");
var express = require("express");
var socketIO = require("socket.io");
// We set up our public path from where we serve our front-end files.
var sep = path.sep, publicPath = path.join(__dirname, ".." + sep + "public");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT || 3000;
app.use(express.static(publicPath));
// Web socket events
io.on('connection', function (socket) {
    socket.on('createMessage', function (message) {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // Emit event to specific user
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user has joined chat',
        createdAt: new Date().getTime()
    });
});
server.listen(port, function () {
    console.log("Server is up on port " + port);
});
