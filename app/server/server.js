"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// We import our App dependencies from npm installment.
var path = require("path");
var express = require("express");
// We set up our public path from where we serve our front-end files.
var sep = path.sep, publicPath = path.join(__dirname, ".." + sep + "public");
var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(publicPath));
app.listen(port, function (err) {
    if (err) {
        return console.log('Unable to start server', err);
    }
    console.log("Server is up on port " + port);
});
