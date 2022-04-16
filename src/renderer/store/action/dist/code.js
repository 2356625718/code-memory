"use strict";
exports.__esModule = true;
exports.setCode = exports.changeCode = exports.deleteCode = exports.addCode = exports.ischangeTitle = exports.changeTitleChoosed = void 0;
exports.changeTitleChoosed = function (id) {
    return {
        type: 'changeTitleChoosed',
        payload: {
            id: id
        }
    };
};
exports.ischangeTitle = function (id, ischange, title) {
    if (ischange === void 0) { ischange = true; }
    return {
        type: 'ischangeTitle',
        payload: {
            id: id,
            ischange: ischange,
            title: title
        }
    };
};
exports.addCode = function () {
    return {
        type: 'addCode',
        payload: {}
    };
};
exports.deleteCode = function (id) {
    return {
        type: 'deleteCode',
        payload: {
            id: id
        }
    };
};
exports.changeCode = function (id, code) {
    return {
        type: 'changeCode',
        payload: {
            id: id,
            code: code
        }
    };
};
exports.setCode = function (code) {
    return {
        type: 'setCode',
        payload: {
            code: code
        }
    };
};
