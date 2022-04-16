"use strict";
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
var layout_1 = require("antd/lib/layout/layout");
require("./Register.less");
var user_1 = require("request/user");
var Register = function (_a) {
    var changePage = _a.changePage;
    var _b = react_1.useState({
        loading1: false
    }), loading = _b[0], setLoading = _b[1];
    var onFinish = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var userName, phone, password, password2, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading({
                        loading1: true
                    });
                    console.log('Received values of form: ', values);
                    userName = values.userName, phone = values.phone, password = values.password, password2 = values.password2;
                    if (!(password === password2)) return [3 /*break*/, 2];
                    return [4 /*yield*/, user_1["default"].register({
                            userName: userName,
                            phone: phone,
                            password: password
                        })];
                case 1:
                    res = _a.sent();
                    if (res.data.status) {
                        antd_1.notification.success({
                            message: "注册成功"
                        });
                        setLoading({
                            loading1: false
                        });
                        changePage('login');
                    }
                    else {
                        antd_1.notification.error({
                            message: res.data.data || '注册失败'
                        });
                        setLoading({
                            loading1: false
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    antd_1.notification.error({
                        message: "两次密码输入不一致！"
                    });
                    setLoading({
                        loading1: false
                    });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "bg" },
        react_1["default"].createElement("div", { className: "heard" },
            react_1["default"].createElement("h1", { className: "title" }, "\u6CE8\u518C")),
        react_1["default"].createElement("div", { className: "login_card" },
            react_1["default"].createElement(antd_1.Form, { name: "normal_login", className: "login-form", onFinish: onFinish },
                react_1["default"].createElement(antd_1.Form.Item, { name: "userName", rules: [{ required: true, message: '请输入用户名!' }], style: { borderBottom: '1px solid #DCDCDC' } },
                    react_1["default"].createElement(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D", bordered: false })),
                react_1["default"].createElement(antd_1.Form.Item, { name: "phone", rules: [{ required: true, message: '请输入手机号!' }], style: { borderBottom: '1px solid #DCDCDC' } },
                    react_1["default"].createElement(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7", bordered: false })),
                react_1["default"].createElement(antd_1.Form.Item, { name: "password", rules: [{ required: true, message: '请设置密码!' }], style: { borderBottom: '1px solid #DCDCDC' } },
                    react_1["default"].createElement(antd_1.Input, { bordered: false, type: "password", placeholder: "\u8BF7\u8BBE\u7F6E\u5BC6\u7801" })),
                react_1["default"].createElement(antd_1.Form.Item, { name: "password2", rules: [{ required: true, message: '请重复密码!' }], style: { borderBottom: '1px solid #DCDCDC' } },
                    react_1["default"].createElement(antd_1.Input, { bordered: false, type: "password", placeholder: "\u8BF7\u91CD\u590D\u5BC6\u7801" })),
                react_1["default"].createElement(antd_1.Form.Item, null,
                    "\u5DF2\u6709\u5E10\u53F7\uFF0C",
                    react_1["default"].createElement("a", { href: "#", onClick: function () { return changePage('login'); } }, "\u70B9\u51FB\u767B\u5F55")),
                react_1["default"].createElement(antd_1.Form.Item, null,
                    react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit", block: true, style: { height: '56PX', borderRadius: '12PX' }, disabled: loading.loading1 }, "\u6CE8\u518C")))),
        react_1["default"].createElement(layout_1.Footer, { className: "footer" }, "\u6B22\u8FCE\u4F7F\u7528\"\u4EE3\u7801\u8BB0\u5FC6\"")));
};
exports["default"] = Register;
