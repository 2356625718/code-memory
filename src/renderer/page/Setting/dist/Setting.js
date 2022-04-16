"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var classnames_1 = require("classnames");
var antd_1 = require("antd");
var react_redux_1 = require("react-redux");
require("./Setting.less");
var Setting = function () {
    var store = react_redux_1.useStore();
    var _a = react_1.useState({
        header: 0
    }), setting = _a[0], setSetting = _a[1];
    var data = [{
            name: '编程语言:',
            jsx: react_1["default"].createElement(antd_1.Select, { defaultValue: 'text/javascript', style: { width: '200px' } },
                react_1["default"].createElement(antd_1.Select.Option, { value: 'text/javascript' }, "JavaScript"),
                react_1["default"].createElement(antd_1.Select.Option, { value: 'text/x-java' }, "Java"),
                react_1["default"].createElement(antd_1.Select.Option, { value: 'text/x-python' }, "Python"),
                react_1["default"].createElement(antd_1.Select.Option, { value: 'text/x-go' }, "Go"),
                react_1["default"].createElement(antd_1.Select.Option, { value: 'text/x-c++src' }, "C++"))
        },
        {
            name: '开启行号:',
            jsx: react_1["default"].createElement(antd_1.Select, { defaultValue: '1', style: { width: '100px' } },
                react_1["default"].createElement(antd_1.Select.Option, { value: '1' }, "\u662F"),
                react_1["default"].createElement(antd_1.Select.Option, { value: '0' }, "\u5426"))
        },
        {
            name: '主题:',
            jsx: react_1["default"].createElement(antd_1.Select, { defaultValue: 'ayu-dark', style: { width: '200px' } },
                react_1["default"].createElement(antd_1.Select.Option, { value: 'ayu-dark' }, "ayu-dark"),
                react_1["default"].createElement(antd_1.Select.Option, { value: 'ayu-mirage' }, "ayu-mirage"),
                react_1["default"].createElement(antd_1.Select.Option, { value: '3024-day' }, "3024-day"),
                react_1["default"].createElement(antd_1.Select.Option, { value: 'idea' }, "idea"))
        },
        {
            name: 'Tab字符数:',
            jsx: react_1["default"].createElement(antd_1.Input, { type: "number", defaultValue: 2, style: { width: '100px' }, min: 0 })
        },
        {
            name: '智能缩进:',
            jsx: react_1["default"].createElement(antd_1.Select, { defaultValue: '1', style: { width: '100px' } },
                react_1["default"].createElement(antd_1.Select.Option, { value: '1' }, "\u662F"),
                react_1["default"].createElement(antd_1.Select.Option, { value: '0' }, "\u5426"))
        }
    ];
    return (react_1["default"].createElement("div", { className: "setting-box" },
        react_1["default"].createElement("div", { className: "setting-header" },
            react_1["default"].createElement("div", { className: "setting-header-list" },
                react_1["default"].createElement("div", { className: classnames_1["default"]({
                        settingHeaderItem: true,
                        settingHeaderItemChoosed: setting.header === 0
                    }), onClick: function () {
                        return setSetting(__assign(__assign({}, setting), { header: 0 }));
                    } }, "editor"),
                react_1["default"].createElement("div", { className: classnames_1["default"]({
                        settingHeaderItem: true,
                        settingHeaderItemChoosed: setting.header === 1
                    }), onClick: function () {
                        return setSetting(__assign(__assign({}, setting), { header: 1 }));
                    } }, "community"))),
        react_1["default"].createElement("div", { className: "setting-title" }, setting.header === 0 ? 'Editor Setting' : 'Community Setting'),
        react_1["default"].createElement("div", { className: "setting-body" }),
        react_1["default"].createElement(antd_1.List, { dataSource: data, renderItem: function (item) { return (react_1["default"].createElement(antd_1.List.Item, null,
                react_1["default"].createElement("div", { className: 'setting-body-item' },
                    react_1["default"].createElement("div", { style: { marginBottom: '5px' } }, item.name),
                    item.jsx))); } })));
};
exports["default"] = Setting;
