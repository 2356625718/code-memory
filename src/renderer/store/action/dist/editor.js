"use strict";
exports.__esModule = true;
exports.changeEditor = void 0;
exports.changeEditor = function (option) {
    return {
        type: 'changeEditor',
        payload: {
            option: option
        }
    };
};
