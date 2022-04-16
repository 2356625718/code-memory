"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
require("./User.less");
var User = function () {
    var user = JSON.parse(sessionStorage.getItem('user'));
    return (react_1["default"].createElement(antd_1.Card, { className: 'user-box', hoverable: true },
        react_1["default"].createElement(antd_1.Avatar, { size: 128 }),
        react_1["default"].createElement("div", { className: 'user-name' }, user.userName),
        react_1["default"].createElement("div", { className: 'user-info' },
            react_1["default"].createElement("div", null,
                "Phone: ",
                user.phone),
            react_1["default"].createElement(antd_1.Divider, null),
            react_1["default"].createElement("div", null,
                "Password: ",
                user.password))));
};
exports["default"] = User;
