"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var Message = /** @class */ (function () {
    function Message(from, text) {
        this.from = from;
        this.text = text;
        this.createdAt = new Date().getTime();
    }
    return Message;
}());
exports.Message = Message;
var LocationMessage = /** @class */ (function () {
    function LocationMessage(from, latitude, longitude) {
        this.from = from;
        this.url = "https://www.google.com/maps?q=" + latitude + "," + longitude;
        this.createdAt = moment().valueOf();
    }
    return LocationMessage;
}());
exports.LocationMessage = LocationMessage;
//# sourceMappingURL=message.js.map