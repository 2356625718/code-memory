"use strict";
exports.__esModule = true;
var Axios_1 = require("../utils/Axios");
var communityRequest = {
    // 获取列表
    getList: function (data) { return Axios_1["default"].get('/community/list', {
        params: data
    }); },
    // 点赞、收藏、评论
    putAction: function (data) { return Axios_1["default"].get('/community/action', {
        params: data
    }); },
    // 获取评论
    getTalk: function (data) { return Axios_1["default"].get('/community/talk', {
        params: data
    }); },
    // 发起评论
    doTalk: function (data) { return Axios_1["default"].get('/community/doTalk', {
        params: data
    }); },
    // 分享代码片段
    shareCode: function (data) { return Axios_1["default"].post('/community/share', data); }
};
exports["default"] = communityRequest;
