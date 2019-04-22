"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message(from, text) {
        this.from = from;
        this.text = text;
        this.createdAt = new Date().getTime();
    }
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message.js.map