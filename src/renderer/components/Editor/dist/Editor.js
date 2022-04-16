"use strict";
exports.__esModule = true;
var react_1 = require("react");
var codemirror_1 = require("codemirror");
require("codemirror/lib/codemirror.js");
require("codemirror/lib/codemirror.css");
require("codemirror/theme/ayu-dark.css");
require("codemirror/theme/ayu-mirage.css");
require("codemirror/theme/3024-day.css");
require("codemirror/theme/idea.css");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/go/go");
require("codemirror/mode/python/python");
require("codemirror/mode/clike/clike");
require("./Editor.less");
var react_redux_1 = require("react-redux");
var code_1 = require("@/store/action/code");
var react_2 = require("react");
var Editor = function (props) {
    var editor = react_1.useRef(null);
    var code;
    var store = react_redux_1.useStore();
    var lastId;
    react_2.useEffect(function () {
        var _a, _b, _c, _d;
        if (editor.current && !props.isCommunity) {
            code = codemirror_1["default"].fromTextArea(editor.current, {
                mode: "text/javascript",
                lineNumbers: true,
                theme: 'ayu-mirage',
                tabSize: 2,
                smartIndent: true
            });
            code.setSize(((_a = props === null || props === void 0 ? void 0 : props.style) === null || _a === void 0 ? void 0 : _a.width) || '100%', ((_b = props === null || props === void 0 ? void 0 : props.style) === null || _b === void 0 ? void 0 : _b.height) || '100%');
            code.setValue(store.getState().code.isChanging.code);
            lastId = store.getState().code.isChanging.id;
            code.on('change', function (el, obj) {
                if (obj.origin !== 'setValue')
                    store.dispatch(code_1.changeCode(store.getState().code.isChanging.id, code.getValue()));
            });
            store.subscribe(function () {
                var nowCode = store.getState().code.isChanging;
                if (nowCode && nowCode.id !== lastId) {
                    code.setValue(nowCode.code);
                    lastId = nowCode.id;
                }
            });
        }
        if (editor.current && props.isCommunity) {
            console.log(props);
            code = codemirror_1["default"].fromTextArea(editor.current, {
                mode: { name: "javascript", json: true },
                lineNumbers: true,
                theme: 'ayu-dark',
                tabSize: 2,
                smartIndent: true
            });
            code.setSize(((_c = props === null || props === void 0 ? void 0 : props.style) === null || _c === void 0 ? void 0 : _c.width) || '100%', ((_d = props === null || props === void 0 ? void 0 : props.style) === null || _d === void 0 ? void 0 : _d.height) || '100%');
            code.setValue(props.value);
        }
    }, [props.value]);
    return (react_1["default"].createElement("textarea", { ref: editor }));
};
exports["default"] = Editor;
