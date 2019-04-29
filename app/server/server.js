"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// We import our App dependencies from npm installment.
var path = require("path");
var http = require("http");
var express = require("express");
var socketIO = require("socket.io");
// Utility functions
var message_1 = require("./utils/message");
var validation_1 = require("./utils/validation");
var users_1 = require("./utils/users");
// We set up our public path from where we serve our front-end files.
var publicPath = path.join(__dirname, '..', 'public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new users_1.Users();
var port = process.env.PORT || 3000;
app.use(express.static(publicPath));
// Web socket events
io.on('connection', function (socket) {
    // Socket Listeners
    socket.on('join', function (_a, callback) {
        var name = _a.name, room = _a.room;
        if (!validation_1.isRealString(name) || !validation_1.isRealString(room)) {
            return callback('Name and room name are required');
        }
        socket.join(room);
        users.removeUser(socket.id);
        users.addUser({
            id: socket.id,
            name: name,
            room: room
        });
        io.to(room).emit('updateUserList', users.getUserList(room));
        callback();
        socket.emit('newMessage', new message_1.Message('Admin', 'Welcome to chat app'));
        socket.broadcast.to(room).emit('newMessage', new message_1.Message('Admin', name + " has joined."));
    });
    socket.on('createMessage', function (_a, callback) {
        var from = _a.from, text = _a.text;
        console.log('createMessage', { from: from, text: text });
        io.emit('newMessage', new message_1.Message(from, text));
        callback();
    });
    socket.on('createLocationMessage', function (_a) {
        var latitude = _a.latitude, longitude = _a.longitude;
        io.emit('newLocationMessage', new message_1.LocationMessage('Admin', latitude, longitude));
    });
    socket.on('disconnect', function () {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', new message_1.Message('Admin', user.name + " has left the room."));
        }
    });
});
server.listen(port, function () {
    console.log("Server is up on port " + port);
});
//# sourceMappingURL=server.js.map