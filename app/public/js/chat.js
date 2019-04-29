"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load Jquery
var jquery_1 = __importDefault(require("jquery"));
var moment_1 = __importDefault(require("moment"));
var mustache_1 = __importDefault(require("mustache"));
var jquery_deparam_1 = __importDefault(require("jquery-deparam"));
(function () {
    function init() {
        var socket = window.io();
        delete window.io;
        // Socket.io listeners
        socket.on('connect', function () {
            var params;
            if (window.location.search[0] === '?') {
                params = jquery_deparam_1.default(window.location.search.substring(1));
            }
            else {
                params = jquery_deparam_1.default(window.location.search);
            }
            socket.emit('join', params, function (err) {
                if (err) {
                    alert(err);
                    window.location.href = '/';
                }
                else {
                    console.log('No error');
                }
            });
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
            scrollToBottom();
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
            scrollToBottom();
        });
        socket.on('updateUserList', function (userList) {
            var ol = jquery_1.default('<ol></ol>');
            userList.forEach(function (user) {
                ol.append(jquery_1.default('<li></li>').text(user));
            });
            jquery_1.default('#users').html("<ol>" + ol.html() + "</ol>");
        });
        socket.on('disconnect', function () {
            console.log('Disconnected from server');
        });
        // Message submit
        var messageTextbox = jquery_1.default('[name=message]');
        jquery_1.default('#message-form').on('submit', function (e) {
            e.preventDefault();
            // Emit the input message
            socket.emit('createMessage', {
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
    function scrollToBottom() {
        // Selectors
        var messages = jquery_1.default('#messages');
        var newMessage = messages.children('li:last-child');
        // Heights
        var clientHeight = messages.prop('clientHeight');
        var scrollTop = messages.prop('scrollTop');
        var scrollHeight = messages.prop('scrollHeight');
        var newMessageHeight = newMessage.innerHeight();
        var lastMessageHeight = newMessage.prev().innerHeight();
        if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            messages.scrollTop(scrollHeight);
        }
    }
    window.addEventListener('load', init);
})();
//# sourceMappingURL=chat.js.map