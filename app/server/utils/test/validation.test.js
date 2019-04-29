"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var expect_1 = __importDefault(require("expect"));
var validation_1 = require("../validation");
describe('isRealString', function () {
    it('sould reject non-string values', function () {
        expect_1.default(validation_1.isRealString(124)).toBe(false);
        expect_1.default(validation_1.isRealString({ n: { m: false } })).toBe(false);
    });
    it('should reject strings with only spaces', function () {
        expect_1.default(validation_1.isRealString('    ')).toBe(false);
    });
    it('should allow string with non-space characters', function () {
        expect_1.default(validation_1.isRealString('D')).toBe(true);
    });
});
//# sourceMappingURL=validation.test.js.map