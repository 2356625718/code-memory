"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var react_redux_1 = require("react-redux");
require("./App.less");
var Menu_1 = require("./Menu/Menu");
var Footer_1 = require("./Footer/Footer");
var page_1 = require("@/page/page");
var code_1 = require("@/store/action/code");
var App = function () {
    var store = react_redux_1.useStore();
    react_1.useEffect(function () {
        if (!localStorage.getItem('data')) {
            var data = {
                codes: [
                    {
                        id: '1',
                        title: '未命名',
                        code: '',
                        isTitleChoosed: true,
                        isTitleHoverd: false,
                        ischangeTitle: false
                    },
                ],
                isChanging: {
                    id: '1',
                    title: '未命名',
                    code: '',
                    isTitleChoosed: true,
                    isTitleHoverd: false,
                    ischangeTitle: false
                }
            };
            localStorage.setItem('data', JSON.stringify(data));
            store.dispatch(code_1.setCode(data));
        }
        else {
            var data = JSON.parse(localStorage.getItem('data'));
            store.dispatch(code_1.setCode(data));
        }
        return function () {
            var data = store.getState().code;
            localStorage.setItem('data', JSON.stringify(data));
        };
    }, []);
    return (react_1["default"].createElement(antd_1.Layout, { style: { height: '100vh', minWidth: '720px', minHeight: '560px' } },
        react_1["default"].createElement(antd_1.Layout, null,
            react_1["default"].createElement(antd_1.Layout.Sider, { width: 60 },
                react_1["default"].createElement(Menu_1["default"], null)),
            react_1["default"].createElement(antd_1.Layout.Content, null,
                react_1["default"].createElement(page_1["default"], null))),
        react_1["default"].createElement(Footer_1["default"], null)));
};
exports["default"] = App;
