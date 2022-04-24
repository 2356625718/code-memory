"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var Index_1 = require("./Index/Index");
var Index_2 = require("./User/Index");
var Community_1 = require("./Community/Community");
var Setting_1 = require("./Setting/Setting");
var Page = function () {
    var _a = react_1.useState('/user'), pathName = _a[0], setPathName = _a[1];
    var store = react_redux_1.useStore();
    react_1.useEffect(function () {
        var unSubscribe = store.subscribe(function () {
            var newPathName = store.getState().page.pathName;
            console.log(newPathName);
            setPathName(newPathName);
        });
        return function () {
            unSubscribe();
        };
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        (pathName === '/index' || pathName === '/') && react_1["default"].createElement(Index_1["default"], null),
        pathName === '/user' && react_1["default"].createElement(Index_2["default"], null),
        pathName === '/community' && react_1["default"].createElement(Community_1["default"], null),
        pathName === '/setting' && react_1["default"].createElement(Setting_1["default"], null)));
};
exports["default"] = Page;
