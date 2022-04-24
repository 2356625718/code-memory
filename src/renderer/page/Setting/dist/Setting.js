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
var ew_color_picker_1 = require("ew-color-picker");
require("ew-color-picker/dist/ew-color-picker.min.css");
require("ew-color-picker/src/style/ew-color-picker.css");
require("./Setting.less");
var editor_1 = require("@/store/action/editor");
var Setting = function () {
    var store = react_redux_1.useStore();
    var colorRef = react_1.useRef(null);
    var stateRef = react_1.useRef(null);
    var colorInstance;
    var _a = react_1.useState({
        header: 0,
        editor: {
            mode: 'text/javascript',
            lineNumbers: true,
            theme: 'ayu-dark',
            tabSize: 2,
            smartIndent: true,
            undoDepth: 200,
            fontSize: 16,
            letterSpacing: 1,
            backgroundColor: 'rgba(0, 0, 0, 1)'
        }
    }), setting = _a[0], setSetting = _a[1];
    react_1.useEffect(function () {
        var editorSetting = store.getState().editor;
        setSetting(__assign(__assign({}, setting), { editor: editorSetting }));
        if (colorRef.current) {
            colorInstance = new ew_color_picker_1["default"]({
                el: colorRef.current,
                alpha: true,
                size: {
                    width: 100,
                    height: 35
                },
                defaultColor: editorSetting.backgroundColor,
                changeColor: function (color) {
                    setSetting(__assign(__assign({}, setting), { editor: __assign(__assign({}, setting.editor), { backgroundColor: color }) }));
                }
            });
            console.log(colorInstance);
        }
        return function () {
            store.dispatch(editor_1.changeEditor(stateRef.current));
        };
    }, []);
    react_1.useEffect(function () {
        // @ts-ignore
        stateRef.current = setting.editor;
        console.log(setting.editor.backgroundColor);
        // @ts-ignore
        document.getElementsByClassName('ew-color-picker-box')[0].style.backgroundColor = setting.editor.backgroundColor;
    }, [setting.editor]);
    var data = [
        {
            name: '编程语言:',
            jsx: (react_1["default"].createElement(antd_1.Select, { style: { width: '200px' }, value: setting.editor.mode, onChange: function (val) {
                    return setSetting(__assign(__assign({}, setting), { editor: __assign(__assign({}, setting.editor), { mode: val }) }));
                } },
                react_1["default"].createElement(antd_1.Select.Option, { value: "text/javascript" }, "JavaScript"),
                react_1["default"].createElement(antd_1.Select.Option, { value: "text/x-java" }, "Java"),
                react_1["default"].createElement(antd_1.Select.Option, { value: "text/x-python" }, "Python"),
                react_1["default"].createElement(antd_1.Select.Option, { value: "text/x-go" }, "Go"),
                react_1["default"].createElement(antd_1.Select.Option, { value: "text/x-c++src" }, "C++")))
        },
        {
            name: '开启行号:',
            jsx: (react_1["default"].createElement(antd_1.Select, { style: { width: '100px' }, value: setting.editor.lineNumbers, onChange: function (val) {
                    return setSetting(__assign(__assign({}, setting), { editor: __assign(__assign({}, setting.editor), { lineNumbers: val }) }));
                } },
                react_1["default"].createElement(antd_1.Select.Option, { value: true }, "\u662F"),
                react_1["default"].createElement(antd_1.Select.Option, { value: false }, "\u5426")))
        },
        {
            name: '主题:',
            jsx: (react_1["default"].createElement(antd_1.Select, { defaultValue: "ayu-dark", style: { width: '200px' }, value: setting.editor.theme, onChange: function (val) {
                    return setSetting(__assign(__assign({}, setting), { editor: __assign(__assign({}, setting.editor), { theme: val }) }));
                } },
                react_1["default"].createElement(antd_1.Select.Option, { value: "ayu-dark" }, "ayu-dark"),
                react_1["default"].createElement(antd_1.Select.Option, { value: "ayu-mirage" }, "ayu-mirage"),
                react_1["default"].createElement(antd_1.Select.Option, { value: "3024-day" }, "3024-day"),
                react_1["default"].createElement(antd_1.Select.Option, { value: "idea" }, "idea")))
        },
        {
            name: '制表符宽度:',
            jsx: (react_1["default"].createElement(antd_1.Input, { type: "number", value: setting.editor.tabSize, style: { width: '100px' }, min: 0, onChange: function (e) {
                    return setSetting(__assign(__assign({}, setting), { editor: __assign(__assign({}, setting.editor), { tabSize: e.target.value }) }));
                } }))
        },
        {
            name: '智能缩进:',
            jsx: (react_1["default"].createElement(antd_1.Select, { style: { width: '100px' }, value: setting.editor.smartIndent, onChange: function (val) {
                    return setSetting(__assign(__assign({}, setting), { editor: __assign(__assign({}, setting.editor), { smartIndent: val }) }));
                } },
                react_1["default"].createElement(antd_1.Select.Option, { value: true }, "\u662F"),
                react_1["default"].createElement(antd_1.Select.Option, { value: false }, "\u5426")))
        },
        {
            name: '撤销级数:',
            jsx: (react_1["default"].createElement(antd_1.Input, { type: "number", value: setting.editor.undoDepth, style: { width: '100px' }, min: 0, onChange: function (e) {
                    return setSetting(__assign(__assign({}, setting), { editor: __assign(__assign({}, setting.editor), { undoDepth: e.target.value }) }));
                } }))
        },
        {
            name: '字体大小:',
            jsx: (react_1["default"].createElement(antd_1.Input, { type: "number", value: setting.editor.fontSize, style: { width: '100px' }, min: 0, onChange: function (e) {
                    return setSetting(__assign(__assign({}, setting), { editor: __assign(__assign({}, setting.editor), { fontSize: e.target.value }) }));
                } }))
        },
        {
            name: '字符间距:',
            jsx: (react_1["default"].createElement(antd_1.Input, { type: "number", value: setting.editor.letterSpacing, style: { width: '100px' }, min: 0, onChange: function (e) {
                    return setSetting(__assign(__assign({}, setting), { editor: __assign(__assign({}, setting.editor), { letterSpacing: e.target.value }) }));
                } }))
        },
        {
            name: '背景颜色:',
            jsx: react_1["default"].createElement("div", { ref: colorRef }, "\u9009\u62E9\u989C\u8272")
        },
    ];
    return (react_1["default"].createElement("div", { className: "setting-box" },
        react_1["default"].createElement("div", { className: "setting-header" },
            react_1["default"].createElement("div", { className: "setting-header-list" },
                react_1["default"].createElement("div", { className: classnames_1["default"]({
                        settingHeaderItem: true,
                        settingHeaderItemChoosed: setting.header === 0
                    }), onClick: function () {
                        return setSetting(__assign(__assign({}, setting), { header: 0 }));
                    } }, "\u7F16\u8F91\u5668"),
                react_1["default"].createElement("div", { className: classnames_1["default"]({
                        settingHeaderItem: true,
                        settingHeaderItemChoosed: setting.header === 1
                    }), onClick: function () {
                        return setSetting(__assign(__assign({}, setting), { header: 1 }));
                    } }, "\u793E\u533A"))),
        react_1["default"].createElement("div", { className: "setting-title" }, setting.header === 0 ? '编辑器设置' : '社区设置'),
        react_1["default"].createElement("div", { className: "setting-body" }),
        data.map(function (item, index) {
            return (react_1["default"].createElement("div", { className: "setting-body-item", key: index },
                react_1["default"].createElement("div", { style: { marginBottom: '5px' } }, item.name),
                item.jsx));
        }),
        react_1["default"].createElement(antd_1.Button, { type: "primary", style: { marginLeft: '100px', marginTop: '20px' }, onClick: function () {
                setSetting(__assign(__assign({}, setting), { editor: {
                        mode: 'text/javascript',
                        lineNumbers: true,
                        theme: 'ayu-dark',
                        tabSize: 2,
                        smartIndent: true,
                        undoDepth: 200,
                        fontSize: 16,
                        letterSpacing: 1,
                        backgroundColor: 'rgba(0, 0, 0, 1)'
                    } }));
            } }, "\u8FD8\u539F\u9ED8\u8BA4\u8BBE\u7F6E")));
};
exports["default"] = Setting;
