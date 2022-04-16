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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var react_redux_1 = require("react-redux");
var code_1 = require("request/code");
require("./Share.less");
var Share = function () {
    var store = react_redux_1.useStore();
    var user = store.getState().user;
    var _a = react_1.useState({
        item: '',
        introduce: '',
        list: []
    }), data = _a[0], setData = _a[1];
    var getCode = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(user);
                    return [4 /*yield*/, code_1["default"].getCode({
                            userId: user.id
                        })];
                case 1:
                    res = _a.sent();
                    if (res.data.status) {
                        setData(__assign(__assign({}, data), { list: res.data.data }));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function () {
        console.log(data);
    };
    react_1.useEffect(function () {
        getCode();
    }, []);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(antd_1.Form.Item, { label: "\u6807\u9898\u540D" },
            react_1["default"].createElement(antd_1.Select, { onChange: function (val) {
                    setData(__assign(__assign({}, data), { item: val }));
                } }, data.list.map(function (item, index) { return (react_1["default"].createElement(antd_1.Select.Option, { value: item, key: index }, item.title)); }))),
        react_1["default"].createElement(antd_1.Form.Item, { label: "\u7B80\u4ECB" },
            react_1["default"].createElement(antd_1.Input.TextArea, { rows: 5, value: data.introduce, onChange: function (e) { return setData(__assign(__assign({}, data), { introduce: e.target.value })); } })),
        react_1["default"].createElement(antd_1.Form.Item, null,
            react_1["default"].createElement(antd_1.Button, { htmlType: "submit", type: "primary", onClick: function () { return handleSubmit(); } }, "\u6211\u8981\u5206\u4EAB"))));
};
exports["default"] = Share;
