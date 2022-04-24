"use strict";
exports.__esModule = true;
var codes = [];
var codeReducer = function (state, action) {
    if (state === void 0) { state = codes; }
    switch (action.type) {
        case 'setCode': {
            return action.payload.code;
        }
        default: {
            return state;
        }
    }
};
exports["default"] = codeReducer;
