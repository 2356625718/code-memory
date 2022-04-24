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
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var react_redux_1 = require("react-redux");
var lodash_1 = require("lodash");
var uuid_1 = require("uuid");
var classnames_1 = require("classnames");
var code_1 = require("@/store/action/code");
require("./Index.less");
var Editor_1 = require("@/components/Editor/Editor");
var code_2 = require("request/code");
var Index = function () {
    var _a;
    var store = react_redux_1.useStore();
    var user = JSON.parse(sessionStorage.getItem('user'));
    var _b = react_1.useState([]), data = _b[0], setData = _b[1];
    var dataRef = react_1.useRef(null);
    var keyDown = function (e, index) {
        var code = e.keyCode;
        if (code === 32)
            e.preventDefault();
        if (code === 13) {
            var clone = lodash_1["default"].cloneDeep(data);
            clone[index].title = e.target.value;
            clone[index].ischangeTitle = false;
            setData(clone);
        }
    };
    var storeData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, code_2["default"].addCode({
                        userId: user.id,
                        codes: dataRef.current
                    })];
                case 1:
                    res = _a.sent();
                    if (res) {
                        console.log(res);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        console.log(store.getState());
        var startData = store.getState().code;
        if (startData.length)
            startData[0].isTitleChoosed = true;
        setData(startData);
        return function () {
            store.dispatch(code_1.setCode(data));
            storeData();
        };
    }, []);
    react_1.useEffect(function () {
        // @ts-ignore
        dataRef.current = data;
    }, [data]);
    return (react_1["default"].createElement(antd_1.Row, { className: "index-content" },
        react_1["default"].createElement(antd_1.Col, { span: 4 },
            react_1["default"].createElement("div", { className: "title-content" },
                react_1["default"].createElement("div", { className: "title-header" },
                    react_1["default"].createElement("span", null, "\u6807\u9898"),
                    react_1["default"].createElement(antd_1.Tooltip, { title: "\u65B0\u589E", placement: "right" },
                        react_1["default"].createElement(icons_1.PlusOutlined, { onClick: function () {
                                var clone = lodash_1["default"].cloneDeep(data);
                                clone.forEach(function (item, index) {
                                    clone[index].isTitleChoosed = false;
                                });
                                clone.push({
                                    id: uuid_1.v4(),
                                    title: '未命名',
                                    code: '',
                                    isTitleChoosed: true,
                                    ischangeTitle: false
                                });
                                setData(clone);
                            }, className: "add-title" }))),
                react_1["default"].createElement("div", { className: 'title-list' }, data.map(function (item, index) { return (react_1["default"].createElement("div", { key: item.id, className: classnames_1["default"]({
                        choosed: item.isTitleChoosed,
                        titleItem: true
                    }), onClick: function () {
                        var clone = lodash_1["default"].cloneDeep(data);
                        clone.forEach(function (item, index) {
                            clone[index].isTitleChoosed = false;
                        });
                        clone[index].isTitleChoosed = true;
                        setData(clone);
                    } },
                    (item === null || item === void 0 ? void 0 : item.ischangeTitle) ? (react_1["default"].createElement(antd_1.Input, { type: "text", defaultValue: item.title, className: "titleInput", onKeyDown: function (e) { return keyDown(e, index); }, bordered: false })) : (react_1["default"].createElement("span", null, item.title)),
                    react_1["default"].createElement("div", { className: "icons" },
                        react_1["default"].createElement(icons_1.FormOutlined, { className: "icon", onClick: function (e) {
                                var _a, _b;
                                e.stopPropagation();
                                var clone = lodash_1["default"].cloneDeep(data);
                                clone.forEach(function (item, index) {
                                    if (item === null || item === void 0 ? void 0 : item.ischangeTitle) {
                                        clone[index].ischangeTitle = false;
                                    }
                                });
                                if ((_a = clone[index]) === null || _a === void 0 ? void 0 : _a.ischangeTitle) {
                                    clone[index].ischangeTitle =
                                        !((_b = clone[index]) === null || _b === void 0 ? void 0 : _b.ischangeTitle);
                                }
                                else {
                                    clone[index].ischangeTitle = true;
                                }
                                setData(clone);
                            } }),
                        react_1["default"].createElement(icons_1.CloseOutlined, { className: "icon", onClick: function (e) {
                                e.stopPropagation();
                                var clone = lodash_1["default"].cloneDeep(data).filter(function (item2, index2) { return index2 !== index; });
                                setData(clone);
                            } })))); })))),
        react_1["default"].createElement(antd_1.Col, { span: 20, className: "content-box" }, data.length ? react_1["default"].createElement(Editor_1["default"], { data: (_a = data.find(function (item) { return item.isTitleChoosed; })) === null || _a === void 0 ? void 0 : _a.code, changeCode: function (str) {
                var clone = lodash_1["default"].cloneDeep(data);
                clone[clone.findIndex(function (item) { return item.isTitleChoosed; })].code = str;
                setData(clone);
            } }) : react_1["default"].createElement("span", { style: { fontSize: '35px', color: 'white' } }, "\u8BF7\u5148\u521B\u5EFA\u6807\u9898"))));
};
exports["default"] = Index;
