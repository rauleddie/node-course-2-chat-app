"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageGenerator = /** @class */ (function () {
    function MessageGenerator(from, text) {
        this.from = from;
        this.text = text;
        this.createdAt = new Date().getTime();
    }
    return MessageGenerator;
}());
exports.MessageGenerator = MessageGenerator;
