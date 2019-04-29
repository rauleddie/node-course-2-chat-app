"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var expect_1 = __importDefault(require("expect"));
var message_1 = require("../message");
describe('generateMessage', function () {
    it('should generate the correct message object', function () {
        var from = 'John Doe', text = 'Some message';
        var message = new message_1.Message(from, text);
        expect_1.default(typeof message.createdAt).toBe('number');
        expect_1.default(message).toInclude({ from: from, text: text });
    });
});
describe('generateLocationMessage', function () {
    it('should generate correct location object', function () {
        var from = 'Deb', lat = 15, long = 19;
        var url = "https://www.google.com/maps?q=" + lat + "," + long;
        var locationMessage = new message_1.LocationMessage(from, lat, long);
        expect_1.default(typeof locationMessage.createdAt).toBe('number');
        expect_1.default(locationMessage).toInclude({ from: from, url: url });
    });
});
//# sourceMappingURL=message.test.js.map