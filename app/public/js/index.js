"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load Jquery
var jquery_1 = __importDefault(require("jquery"));
function init() {
    var socket = window.io();
    socket.on('connect', function () {
        console.log('Connected to the server');
    });
    socket.on('newMessage', function (_a) {
        var from = _a.from, text = _a.text;
        console.log({ from: from, text: text });
        var li = jquery_1.default('<li></li>').text(from + " : " + text);
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
}
window.addEventListener('load', init);
//# sourceMappingURL=index.js.map