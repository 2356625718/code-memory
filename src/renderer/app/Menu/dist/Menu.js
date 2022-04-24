"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var classnames_1 = require("classnames");
var react_redux_1 = require("react-redux");
require("./Menu.less");
var page_1 = require("@/store/action/page");
var Menu = function () {
    var store = react_redux_1.useStore();
    var _a = react_1.useState(3), choosed = _a[0], setChoosed = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "menu-content" },
            react_1["default"].createElement("div", { className: "top-area" },
                react_1["default"].createElement("div", { className: "menu-item" },
                    react_1["default"].createElement(antd_1.Badge, { color: "#007acc", offset: [-4, 32], size: "small" },
                        react_1["default"].createElement(antd_1.Tooltip, { title: "\u4EE3\u7801\u7BA1\u7406", placement: "right" },
                            react_1["default"].createElement(icons_1.SnippetsOutlined, { className: classnames_1["default"]({
                                    menuIcon: true,
                                    menuChoosed: choosed === 1
                                }), onClick: function () { store.dispatch(page_1.changePage('/')); setChoosed(1); } })))),
                react_1["default"].createElement("div", { className: "menu-item" },
                    react_1["default"].createElement(antd_1.Badge, { color: "#007acc", offset: [-4, 32], size: "small" },
                        react_1["default"].createElement(antd_1.Tooltip, { title: "\u793E\u533A", placement: "right" },
                            react_1["default"].createElement(icons_1.SisternodeOutlined, { className: classnames_1["default"]({
                                    menuIcon: true,
                                    menuChoosed: choosed === 2
                                }), onClick: function () { store.dispatch(page_1.changePage('/community')); setChoosed(2); } }))))),
            react_1["default"].createElement("div", { className: "bottom-area" },
                react_1["default"].createElement("div", { className: classnames_1["default"]('menu-item', 'menu-bottom') },
                    react_1["default"].createElement(antd_1.Badge, { color: "#007acc", offset: [-4, 32], size: "small" },
                        react_1["default"].createElement(antd_1.Tooltip, { title: "\u8D26\u6237", placement: "right" },
                            react_1["default"].createElement(icons_1.UserOutlined, { className: classnames_1["default"]({
                                    menuIcon: true,
                                    menuChoosed: choosed === 3
                                }), onClick: function () { store.dispatch(page_1.changePage('/user')); setChoosed(3); } })))),
                react_1["default"].createElement("div", { className: classnames_1["default"]('menu-item', 'menu-bottom') },
                    react_1["default"].createElement(antd_1.Badge, { color: "#007acc", offset: [-4, 32], size: "small" },
                        react_1["default"].createElement(antd_1.Tooltip, { title: "\u8BBE\u7F6E", placement: "right" },
                            react_1["default"].createElement(icons_1.SettingOutlined, { className: classnames_1["default"]({
                                    menuIcon: true,
                                    menuChoosed: choosed === 4
                                }), onClick: function () { store.dispatch(page_1.changePage('/setting')); setChoosed(4); } }))))))));
};
exports["default"] = Menu;
