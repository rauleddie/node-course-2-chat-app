"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var expect_1 = __importDefault(require("expect"));
var users_1 = require("../users");
describe('Users', function () {
    // Seed Data for getUserList, getUser, removeUSer
    var users = new users_1.Users();
    beforeEach(function () {
        users.usersArray = [
            {
                id: '1',
                name: 'Mike',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Jen',
                room: 'React Course'
            },
            {
                id: '3',
                name: 'Julie',
                room: 'Node Course'
            }
        ];
    });
    it('should add new user', function () {
        var users = new users_1.Users();
        var resUser = users.addUser({
            id: '123',
            name: 'Andrew',
            room: 'The office fans'
        });
        expect_1.default(users.usersArray).toEqual([resUser]);
    });
    it('should remove a user', function () {
        var removedUser = users.removeUser('1');
        expect_1.default(removedUser).toExist();
        expect_1.default(removedUser.id).toBe('1');
        expect_1.default(users.usersArray.length).toBe(2);
    });
    it('should not remove a user', function () {
        var user = users.removeUser('0');
        expect_1.default(user).toNotExist();
        expect_1.default(users.usersArray.length).toBe(3);
    });
    it('should return names for node course', function () {
        var userList = users.getUserList('Node Course');
        expect_1.default(userList).toEqual(['Mike', 'Julie']);
    });
    it('should return names for react course', function () {
        var userList = users.getUserList('React Course');
        expect_1.default(userList).toEqual(['Jen']);
    });
    it('should find user', function () {
        var user = users.getUser('2');
        expect_1.default(user).toExist();
        expect_1.default(user.id).toBe('2');
    });
    it('should not find user', function () {
        var user = users.getUser('0');
        expect_1.default(user).toNotExist();
    });
});
//# sourceMappingURL=users.test.js.map