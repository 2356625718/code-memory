"use strict";
exports.__esModule = true;
exports.setCode = void 0;
exports.setCode = function (code) {
    return {
        type: 'setCode',
        payload: {
            code: code
        }
    };
};
