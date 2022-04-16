"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var userConfig = {};
var userReducer = function (state, action) {
    if (state === void 0) { state = userConfig; }
    switch (action.type) {
        case 'setUser': {
            console.log(action);
            var clone = lodash_1["default"].cloneDeep(state);
            clone = action.payload.user;
            return clone;
        }
        default: {
            return state;
        }
    }
};
exports["default"] = userReducer;
