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
//# sourceMappingURL=message.test.js.map