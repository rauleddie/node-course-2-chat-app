"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load Jquery
var jquery_1 = __importDefault(require("jquery"));
(function () {
    function init() {
        var socket = window.io();
        // Socket.io listeners
        socket.on('connect', function () {
            console.log('Connected to the server');
        });
        socket.on('newMessage', function (_a) {
            var from = _a.from, text = _a.text;
            console.log({ from: from, text: text });
            var li = jquery_1.default('<li></li>').text(from + " : " + text);
            jquery_1.default('#messages').append(li);
        });
        socket.on('newLocationMessage', function (message) {
            var li = jquery_1.default('<li></li>');
            var a = jquery_1.default('<a target="_blank">My current location</a>');
            a.attr('href', message.url);
            li.text(message.from + " : ").append(a);
            jquery_1.default('#messages').append(li);
        });
        // Message submit
        jquery_1.default('#message-form').on('submit', function (e) {
            e.preventDefault();
            // Emit the input message
            socket.emit('createMessage', {
                from: 'User',
                text: jquery_1.default('[name=message]').val()
            }, 
            // Acknowledgment callback
            function () {
            });
        });
        // Send location handler
        var locationButton = jquery_1.default('#send-location');
        locationButton.on('click', function () {
            if (!navigator.geolocation) {
                return alert('Geolocation not supported by your browser');
            }
            navigator.geolocation.getCurrentPosition(function (_a) {
                var _b = _a.coords, latitude = _b.latitude, longitude = _b.longitude;
                socket.emit('createLocationMessage', {
                    latitude: latitude,
                    longitude: longitude
                });
            }, function (err) {
                alert('Unable to fetch location');
            });
        });
    }
    window.addEventListener('load', init);
})();
//# sourceMappingURL=index.js.map