"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var page_1 = require("./page");
var code_1 = require("./code");
var user_1 = require("./user");
var editor_1 = require("./editor");
exports["default"] = redux_1.combineReducers({
    page: page_1["default"],
    code: code_1["default"],
    user: user_1["default"],
    editor: editor_1["default"]
});
