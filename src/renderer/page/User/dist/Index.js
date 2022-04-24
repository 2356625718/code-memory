"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Login_1 = require("./Login/Login");
var Register_1 = require("./Login/Register");
var User_1 = require("./User");
var Index = function () {
    var _a = react_1.useState('login'), page = _a[0], setPage = _a[1];
    if (page !== 'user' && sessionStorage.getItem('user')) {
        setPage('user');
    }
    var changePage = function (change) {
        setPage(change);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        page === 'login' && react_1["default"].createElement(Login_1["default"], { changePage: changePage }),
        page === 'register' && react_1["default"].createElement(Register_1["default"], { changePage: changePage }),
        page === 'user' && react_1["default"].createElement(User_1["default"], null)));
};
exports["default"] = Index;
