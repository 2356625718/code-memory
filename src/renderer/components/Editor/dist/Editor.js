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
var react_redux_1 = require("react-redux");
require("./Editor.less");
var Editor = function (props) {
    var store = react_redux_1.useStore();
    var editor = react_1.useRef(null);
    var editorSetting = store.getState().editor;
    console.log(editorSetting);
    var code;
    var setStyle = function () {
        var el = document.getElementsByClassName('CodeMirror')[0];
        var gutter = document.getElementsByClassName('CodeMirror-gutters')[0];
        el.style.fontSize = editorSetting.fontSize;
        el.style.letterSpacing = editorSetting.letterSpacing;
        el.style.backgroundColor = editorSetting.backgroundColor;
        gutter.style.backgroundColor = editorSetting.backgroundColor;
    };
    react_1.useEffect(function () {
        var _a, _b;
        if (editor.current) {
            code = codemirror_1["default"].fromTextArea(editor.current, editorSetting);
            code.setSize(((_a = props === null || props === void 0 ? void 0 : props.style) === null || _a === void 0 ? void 0 : _a.width) || '100%', ((_b = props === null || props === void 0 ? void 0 : props.style) === null || _b === void 0 ? void 0 : _b.height) || '100%');
            code.setValue(props.data);
            setStyle();
            if (!props.readOnly) {
                code.on('change', function () {
                    props.changeCode(code.getValue());
                });
            }
        }
    }, []);
    return (react_1["default"].createElement("textarea", { ref: editor }));
};
exports["default"] = Editor;
