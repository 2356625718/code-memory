"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var uuid_1 = require("uuid");
var codeConfig = {
    codes: [
        {
            id: '1',
            title: '未命名',
            code: '',
            isTitleChoosed: true,
            ischangeTitle: false
        },
    ],
    isChanging: {
        id: '1',
        title: '未命名',
        code: '',
        isTitleChoosed: true,
        ischangeTitle: false
    }
};
var codeReducer = function (state, action) {
    var _a;
    if (state === void 0) { state = codeConfig; }
    switch (action.type) {
        // 选中改变
        case 'changeTitleChoosed': {
            var clone_1 = lodash_1["default"].cloneDeep(state);
            clone_1.codes.forEach(function (item, index) {
                item.id === action.payload.id
                    ? (clone_1.codes[index].isTitleChoosed = true)
                    : (clone_1.codes[index].isTitleChoosed = false);
            });
            // @ts-ignore
            clone_1.isChanging = clone_1.codes.find(function (item) { return item.id === action.payload.id; });
            return clone_1;
        }
        // 改变标题名
        case 'ischangeTitle': {
            var clone_2 = lodash_1["default"].cloneDeep(state);
            clone_2.codes.forEach(function (item, index) {
                if (!action.payload.ischange) {
                    clone_2.codes[index].ischangeTitle = false;
                    clone_2.codes[clone_2.codes.findIndex(function (item) { return item.id === action.payload.id; })].title = action.payload.title;
                }
                else {
                    item.id === action.payload.id
                        ? (clone_2.codes[index].ischangeTitle = true)
                        : (clone_2.codes[index].ischangeTitle = false);
                }
            });
            return clone_2;
        }
        // 改变代码片段
        case 'addCode': {
            var clone = lodash_1["default"].cloneDeep(state);
            clone.codes.push({
                id: uuid_1.v4(),
                title: '未命名',
                code: '',
                isTitleChoosed: false,
                ischangeTitle: false
            });
            return clone;
        }
        // 删除代码片段
        case 'deleteCode': {
            if (state.codes.length === 1)
                return state;
            var clone = lodash_1["default"].cloneDeep(state);
            clone.codes.splice(clone.codes.findIndex((function (item) {
                if (item.id === action.payload.id)
                    return true;
            })), 1);
            clone.codes[0].isTitleChoosed = true;
            clone.isChanging = clone.codes[0];
            return clone;
        }
        case 'changeCode': {
            var clone = lodash_1["default"].cloneDeep(state);
            clone.codes[clone.codes.findIndex(function (item) { return item.id === action.payload.id; })].code = action.payload.code;
            return clone;
        }
        case 'setCode': {
            if (!((_a = action.payload.code) === null || _a === void 0 ? void 0 : _a.isChanging))
                action.payload.code.isChanging = action.payload.code.codes[0] || {};
            return action.payload.code;
        }
        default: {
            return state;
        }
    }
};
exports["default"] = codeReducer;
