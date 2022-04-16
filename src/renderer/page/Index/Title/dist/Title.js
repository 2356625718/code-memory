"use strict";
exports.__esModule = true;
var react_1 = require("react");
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var react_redux_1 = require("react-redux");
var TitleArea_1 = require("@/components/TitleArea/TitleArea");
require("./Title.less");
var code_1 = require("@/store/action/code");
var Title = function () {
    var store = react_redux_1.useStore();
    return (react_1["default"].createElement("div", { className: 'title-content' },
        react_1["default"].createElement("div", { className: 'title-header' },
            react_1["default"].createElement("span", null, "\u4EE3\u7801\u7247\u6BB5\u6807\u9898"),
            react_1["default"].createElement(antd_1.Tooltip, { title: "\u65B0\u589E", placement: "right" },
                react_1["default"].createElement(icons_1.PlusOutlined, { onClick: function () { return store.dispatch(code_1.addCode()); } }))),
        react_1["default"].createElement(TitleArea_1["default"], null)));
};
exports["default"] = Title;
