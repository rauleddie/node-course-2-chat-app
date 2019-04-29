"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Users = /** @class */ (function () {
    function Users() {
        this.usersArray = [];
    }
    /**
     * Add a user to the Users array
     * @param {Object} user - The user object to add
     */
    Users.prototype.addUser = function (user) {
        this.usersArray.push(user);
        return user;
    };
    /**
     * Remove a user from the Users array
     * @param {string} id - The user id
     */
    Users.prototype.removeUser = function (id) {
        var user = this.usersArray.find(function (user) { return user.id === id; });
        if (!user) {
            return user;
        }
        this.usersArray = this.usersArray.filter(function (usr) { return usr.id !== user.id; });
        return user;
    };
    /**
     * Get a user from the Users array
     * @param {string} id - The user id
     */
    Users.prototype.getUser = function (id) {
        return this.usersArray.find(function (user) { return user.id === id; });
    };
    /**
     * Get a list of users from a specific room
     * @param {string} room - The room which the users are located
     */
    Users.prototype.getUserList = function (room) {
        return this.usersArray.filter(function (user) {
            return user.room === room;
        })
            .map(function (user) { return user.name; });
    };
    return Users;
}());
exports.Users = Users;
//# sourceMappingURL=users.js.map