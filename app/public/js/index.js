"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load Jquery
var jquery_1 = __importDefault(require("jquery"));
var moment_1 = __importDefault(require("moment"));
var mustache_1 = __importDefault(require("mustache"));
(function () {
    function init() {
        var socket = window.io();
        // Socket.io listeners
        socket.on('connect', function () {
            console.log('Connected to the server');
        });
        socket.on('newMessage', function (message) {
            var formattedTime = moment_1.default(message.createdAt).format('h:mm a');
            var template = jquery_1.default('#message-template').html();
            var from = message.from, text = message.text;
            var html = mustache_1.default.render(template, {
                from: from,
                text: text,
                formattedTime: formattedTime
            });
            jquery_1.default('#messages').append(html);
        });
        socket.on('newLocationMessage', function (message) {
            var formattedTime = moment_1.default(message.createdAt).format('h:mm a');
            var template = jquery_1.default('#location-message-template').html();
            var from = message.from, url = message.url;
            var html = mustache_1.default.render(template, {
                from: from,
                url: url,
                formattedTime: formattedTime
            });
            jquery_1.default('#messages').append(html);
            // const li = $('<li></li>');
            // const a = $('<a target="_blank">My current location</a>');
            // const formattedTime = moment(message.createdAt).format('h:mm a');
            // a.attr('href', message.url);
            // li.text(`${message.from} ${formattedTime}: `).append(a);
            // $('#messages').append(li);
        });
        // Message submit
        var messageTextbox = jquery_1.default('[name=message]');
        jquery_1.default('#message-form').on('submit', function (e) {
            e.preventDefault();
            // Emit the input message
            socket.emit('createMessage', {
                from: 'User',
                text: messageTextbox.val()
            }, 
            // Acknowledgment callback
            function () {
                messageTextbox.val('');
            });
        });
        // Send location handler
        var locationButton = jquery_1.default('#send-location');
        locationButton.on('click', function () {
            if (!navigator.geolocation) {
                return alert('Geolocation not supported by your browser');
            }
            locationButton.attr('disabled', 'disabled').text('Sending location...');
            navigator.geolocation.getCurrentPosition(function (_a) {
                var _b = _a.coords, latitude = _b.latitude, longitude = _b.longitude;
                locationButton.removeAttr('disabled').text('Send Location');
                socket.emit('createLocationMessage', {
                    latitude: latitude,
                    longitude: longitude
                });
            }, function (err) {
                locationButton.removeAttr('disabled').text('Send Location');
                alert('Unable to fetch location');
            });
        });
    }
    window.addEventListener('load', init);
})();
//# sourceMappingURL=index.js.map