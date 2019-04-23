"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require("expect");
var message_1 = require("../message");
describe('generateMessage', function () {
    it('should generate the correct message object', function () {
        var from = 'John Doe', text = 'Some message';
        var message = new message_1.Message(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toInclude({ from: from, text: text });
    });
});
describe('generateLocationMessage', function () {
    it('should generate correct location object', function () {
        var from = 'Deb', lat = 15, long = 19;
        var url = "https://www.google.com/maps?q=" + lat + "," + long;
        var locationMessage = new message_1.LocationMessage(from, lat, long);
        expect(typeof locationMessage.createdAt).toBe('number');
        expect(locationMessage).toInclude({ from: from, url: url });
    });
});
//# sourceMappingURL=message.test.js.map