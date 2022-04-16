"use strict";
exports.__esModule = true;
var editorConfig = {
    mode: { name: 'javascript', json: true },
    lineNumbers: true,
    theme: 'ayu-dark',
    tabSize: 2,
    smartIndent: true
};
var editorReducer = function (state, action) {
    if (state === void 0) { state = editorConfig; }
    switch (action.type) {
        case 'changeEditor': {
            return action.payload.option;
        }
        default: {
            return state;
        }
    }
};
exports["default"] = editorReducer;
