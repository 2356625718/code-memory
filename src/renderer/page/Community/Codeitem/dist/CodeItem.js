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
var icons_1 = require("@ant-design/icons");
var react_redux_1 = require("react-redux");
require("./CodeItem.less");
var Editor_1 = require("@/components/Editor/Editor");
var community_1 = require("request/community");
var CodeItem = function (_a) {
    var isCollect = _a.isCollect;
    var store = react_redux_1.useStore();
    var user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user);
    var _b = react_1.useState([]), list = _b[0], setList = _b[1];
    var _c = react_1.useState({
        pageSize: 4,
        pageNum: 1,
        len: 0
    }), setting = _c[0], setSetting = _c[1];
    var _d = react_1.useState({
        isShow: false,
        item: {
            id: '',
            code: ''
        },
        talk: [],
        talkValue: '',
        reply: false,
        replyItem: {
            deep: 1,
            id: 1
        }
    }), modal = _d[0], setModal = _d[1];
    var CommentWithChild = function (props) { return (react_1["default"].createElement("div", { className: "comment-box" },
        react_1["default"].createElement(antd_1.Comment, { actions: [react_1["default"].createElement("span", { key: "comment-nested-reply-to", onClick: function () {
                        setModal(__assign(__assign({}, modal), { reply: true, replyItem: props.data, talkValue: '请输入回复内容' }));
                    } }, "\u56DE\u590D")], author: react_1["default"].createElement("a", null, props.data.userInfo.userName), avatar: react_1["default"].createElement(antd_1.Avatar, { src: "https://joeschmoe.io/api/v1/random", alt: "Han Solo" }), content: react_1["default"].createElement("p", null, props.data.content) }, props.children))); };
    var getList = function (pageNum) { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, community_1["default"].getList({
                        userId: user.id,
                        pageSize: setting.pageSize,
                        pageNum: pageNum || setting.pageNum,
                        isCollect: isCollect
                    })];
                case 1:
                    res = _a.sent();
                    if (res.data.status) {
                        data = res.data.data;
                        if (isCollect) {
                            setSetting({
                                pageNum: pageNum || setting.pageNum,
                                pageSize: 4,
                                len: data.collectArray.length
                            });
                            setList(data.collectArray);
                        }
                        else {
                            setSetting({
                                pageNum: pageNum || setting.pageNum,
                                pageSize: 4,
                                len: data.list.length
                            });
                            setList(data.list);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var getTalk = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, community_1["default"].getTalk({
                        id: modal.item.id
                    })];
                case 1:
                    res = _a.sent();
                    data = res.data;
                    if (data.status) {
                        setModal(__assign(__assign({}, modal), { isShow: true, talk: data.data }));
                    }
                    else {
                        setModal(__assign(__assign({}, modal), { isShow: true, talk: [] }));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var putAction = function (type, is, codeId) { return __awaiter(void 0, void 0, void 0, function () {
        var data, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = {
                        userId: user.id,
                        codeId: codeId
                    };
                    if (type === 0) {
                        if (is)
                            data.good = false;
                        else
                            data.good = true;
                    }
                    if (type === 1) {
                        if (is)
                            data.collect = false;
                        else
                            data.collect = true;
                    }
                    return [4 /*yield*/, community_1["default"].putAction(data)];
                case 1:
                    res = _a.sent();
                    if (res.data.status) {
                        getList();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var mapToTalk = function (arr) {
        if (!Array.isArray(arr) || arr.length === 0)
            return;
        var res = arr.map(function (item, index) { return (react_1["default"].createElement(CommentWithChild, { data: item, key: item.id }, mapToTalk(item === null || item === void 0 ? void 0 : item.child))); });
        return res;
    };
    var IconText = function (props) { return (react_1["default"].createElement(antd_1.Space, null,
        react_1["default"].createElement(props.icon, {
            style: {
                color: props.value ? props.color : ''
            },
            onClick: function (e) {
                e.stopPropagation();
                putAction(props.type, props.value, props.id);
            }
        }),
        props.text)); };
    react_1.useEffect(function () {
        getList();
        setSetting(__assign(__assign({}, setting), { pageNum: 1 }));
    }, [isCollect]);
    react_1.useEffect(function () {
        if (modal.item.id) {
            getTalk();
        }
    }, [modal.item.id]);
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!modal.talkValue.length)
                        return [2 /*return*/];
                    if (!modal.reply) {
                        data = {
                            userId: user.id,
                            codeId: modal.item.id,
                            content: modal.talkValue,
                            deep: 1
                        };
                    }
                    else {
                        data = {
                            userId: user.id,
                            codeId: modal.item.id,
                            content: modal.talkValue,
                            deep: 2,
                            replyToId: modal.replyItem.id
                        };
                    }
                    return [4 /*yield*/, community_1["default"].doTalk(data)];
                case 1:
                    res = _a.sent();
                    if (res.data.status) {
                        getTalk();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(antd_1.List, { itemLayout: "vertical", size: "large", pagination: {
                onChange: function (page) {
                    getList(page);
                },
                pageSize: setting.pageSize,
                total: setting.len
            }, dataSource: list, renderItem: function (item) { return (react_1["default"].createElement(antd_1.List.Item, { onClick: function () {
                    setModal(__assign(__assign({}, modal), { item: item }));
                }, className: "codeListItem", key: item.id, actions: [
                    react_1["default"].createElement(IconText, { icon: icons_1.LikeOutlined, text: item.goodActionNumber, key: "list-vertical-like-o", value: item.goodAction, color: "red", id: item.id, type: 0 }),
                    react_1["default"].createElement(IconText, { icon: icons_1.StarOutlined, text: item.collectActionNumber, key: "list-vertical-star-o", value: item.collectAction, color: "yellow", id: item.id, type: 1 }),
                    react_1["default"].createElement(IconText, { icon: icons_1.MessageOutlined, text: item.talkActionNumber, key: "list-vertical-message" }),
                ], extra: react_1["default"].createElement(Editor_1["default"], { style: { width: '270px', height: '140px' }, data: item.code }) },
                react_1["default"].createElement(antd_1.List.Item.Meta, { avatar: react_1["default"].createElement(antd_1.Avatar, { src: "https://joeschmoe.io/api/v1/random" }), title: item.userName }),
                item.description)); } }),
        react_1["default"].createElement(antd_1.Modal, { visible: modal.isShow, mask: true, title: react_1["default"].createElement("div", { style: { height: '10px' } }, "\u8BE6\u60C5"), footer: null, width: 1026, destroyOnClose: true, onCancel: function () {
                return setModal(__assign(__assign({}, modal), { isShow: false, talk: [], item: { id: '', code: '' } }));
            } },
            react_1["default"].createElement("div", { className: "modal-box" },
                react_1["default"].createElement(Editor_1["default"], { style: { width: '550px', height: '650px' }, data: modal.item.code }),
                react_1["default"].createElement(antd_1.Card, { hoverable: true, className: "talk-card" },
                    react_1["default"].createElement("div", { className: "talk-box" }, mapToTalk(modal.talk)),
                    react_1["default"].createElement(antd_1.Divider, null),
                    react_1["default"].createElement("div", { className: "input-box" },
                        react_1["default"].createElement(antd_1.Form.Item, null,
                            react_1["default"].createElement(antd_1.Input.TextArea, { rows: 4, value: modal.talkValue, onChange: function (e) { return setModal(__assign(__assign({}, modal), { talkValue: e.target.value })); } })),
                        react_1["default"].createElement(antd_1.Form.Item, null,
                            react_1["default"].createElement(antd_1.Button, { htmlType: "submit", type: "primary", onClick: function () { return handleSubmit(); } }, modal.reply ? '回复评论' : '添加评论'),
                            modal.reply ? react_1["default"].createElement(icons_1.RollbackOutlined, { style: { marginLeft: '15px', fontSize: '20px' }, onClick: function () {
                                    setModal(__assign(__assign({}, modal), { reply: false, talkValue: '' }));
                                } }) : '')))))));
};
exports["default"] = CodeItem;
