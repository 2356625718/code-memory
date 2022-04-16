"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var classnames_1 = require("classnames");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var code_1 = require("@/store/action/code");
require("./TitleItem.less");
var TitleItem = function () {
    var store = react_redux_1.useStore();
    var startData = store.getState().code.codes;
    var _a = react_1.useState(startData), data = _a[0], setData = _a[1];
    var keyDown = function (e, id) {
        var code = e.keyCode;
        if (code === 32)
            e.preventDefault();
        if (code === 13)
            store.dispatch(code_1.ischangeTitle(id, false, e.target.value));
    };
    react_1.useEffect(function () {
        var unSubscribe = store.subscribe(function () {
            var newData = store.getState().code.codes;
            setData(newData);
        });
        return function () {
            unSubscribe();
        };
    }, [data]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.List, { size: "small", dataSource: data, renderItem: function (item) { return (react_1["default"].createElement(antd_1.List.Item, { className: classnames_1["default"]({
                    choosed: item.isTitleChoosed,
                    listItem: true
                }), style: { borderBottom: 'none' }, onClick: function () { return store.dispatch(code_1.changeTitleChoosed(item.id)); } },
                react_1["default"].createElement("div", { className: 'titleItem' },
                    item.ischangeTitle ? react_1["default"].createElement(antd_1.Input, { type: "text", defaultValue: item.title, className: 'titleInput', onKeyDown: function (e) { return keyDown(e, item.id); }, bordered: false }) : react_1["default"].createElement("span", null, item.title),
                    react_1["default"].createElement("div", { className: 'icons' },
                        react_1["default"].createElement(icons_1.FormOutlined, { className: 'icon', onClick: function () { store.dispatch(code_1.ischangeTitle(item.id)); } }),
                        react_1["default"].createElement(icons_1.CloseOutlined, { className: 'icon', onClick: function () { return store.dispatch(code_1.deleteCode(item.id)); } }))))); } })));
};
exports["default"] = TitleItem;
