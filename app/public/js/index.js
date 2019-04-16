"use strict";
var socket = window.io();
socket.on('connect', function () {
    console.log('Connected to the server');
    socket.on('newMessage', function (message) {
        console.log('newMessage', message);
    });
    socket.emit('createMessage', {
        from: 'Andrew',
        text: 'Yup, that works for me'
    });
});
