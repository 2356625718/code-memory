"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var pageConfig = {
    pathName: '/user'
};
var pageReducer = function (state, action) {
    if (state === void 0) { state = pageConfig; }
    switch (action.type) {
        case 'changePage': {
            var clone = lodash_1["default"].cloneDeep(state);
            var user = sessionStorage.getItem('user');
            clone.pathName = user ? action.payload.pathName : '/user';
            return clone;
        }
        default: {
            return state;
        }
    }
};
exports["default"] = pageReducer;
