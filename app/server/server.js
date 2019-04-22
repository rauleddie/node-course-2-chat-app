"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// We import our App dependencies from npm installment.
var path = require("path");
var http = require("http");
var express = require("express");
var socketIO = require("socket.io");
// Utility functions
var message_1 = require("./utils/message");
// We set up our public path from where we serve our front-end files.
var sep = path.sep, publicPath = path.join(__dirname, ".." + sep + "public");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT || 3000;
app.use(express.static(publicPath));
// Web socket events
io.on('connection', function (socket) {
    socket.on('createMessage', function (_a, callback) {
        var from = _a.from, text = _a.text;
        console.log('createMessage', { from: from, text: text });
        io.emit('newMessage', new message_1.Message(from, text));
    });
    socket.emit('newMessage', new message_1.Message('Admin', 'Welcome to chat app'));
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user has joined chat',
        createdAt: new Date().getTime()
    });
});
server.listen(port, function () {
    console.log("Server is up on port " + port);
});
//# sourceMappingURL=server.js.map