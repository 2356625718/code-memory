"use strict";
exports.__esModule = true;
var Axios_1 = require("../utils/Axios");
var codeRequest = {
    // 根据用户id获取代码片段信息
    getCode: function (data) { return Axios_1["default"].get('/code/getCode', {
        params: data
    }); }
};
exports["default"] = codeRequest;
