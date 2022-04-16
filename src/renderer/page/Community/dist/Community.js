"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
require("./Community.less");
var CodeItem_1 = require("./Codeitem/CodeItem");
var Share_1 = require("./Share/Share");
var Community = function () {
    var _a = react_1.useState(false), isCollect = _a[0], setIsCollect = _a[1];
    return (react_1["default"].createElement(antd_1.Row, { className: 'community-box' },
        react_1["default"].createElement(antd_1.Col, { span: 18 },
            react_1["default"].createElement(antd_1.Card, null,
                react_1["default"].createElement(CodeItem_1["default"], { isCollect: isCollect }))),
        react_1["default"].createElement(antd_1.Col, { span: 5, offset: 1 },
            react_1["default"].createElement(antd_1.Card, null,
                "\u6211\u7684\u6536\u85CF",
                react_1["default"].createElement(antd_1.Checkbox, { className: 'my-collect', onChange: function () { return setIsCollect(!isCollect); } }),
                react_1["default"].createElement(antd_1.Divider, null),
                react_1["default"].createElement(Share_1["default"], null)))));
};
exports["default"] = Community;
