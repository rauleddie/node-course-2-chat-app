"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
// const date = new Date();
// const months = ['Jan', 'Feb', 'Mar', 'Apr']; 
// console.log(date.getMonth());
var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('H:MM a'));
var someTimestamp = moment().valueOf();
console.log(someTimestamp);
//# sourceMappingURL=time.js.map