"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
var echarts = require("echarts");
require("./User.less");
var User = function () {
    var user = JSON.parse(sessionStorage.getItem('user'));
    var ref = react_1.useRef(null);
    function getVirtulData(year) {
        year = year || '2017';
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate(+year + 1 + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 5),
            ]);
        }
        console.log(data);
        return data;
    }
    react_1.useEffect(function () {
        var option = {
            title: {
                top: 30,
                left: 'center',
                text: '代码片段贡献日历图'
            },
            visualMap: {
                min: 0,
                max: 5,
                top: '-30',
                textStyle: {
                    color: '#000'
                }
            },
            calendar: {
                top: 120,
                left: 30,
                right: 30,
                cellSize: [40, 40],
                range: '2016',
                itemStyle: {
                    borderWidth: 0.5
                },
                yearLabel: { show: false }
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: getVirtulData('2016')
            }
        };
        if (ref.current) {
            var myChart = echarts.init(ref.current, undefined, {
                width: 1000,
                height: 400
            });
            myChart.setOption(option);
        }
    }, []);
    return (react_1["default"].createElement("div", { className: "user-box" },
        react_1["default"].createElement(antd_1.Avatar, { size: 128 }),
        react_1["default"].createElement("div", { className: "user-name" }, user.userName),
        react_1["default"].createElement("div", { className: "user-info" },
            react_1["default"].createElement("div", null,
                "\u7535\u8BDD\u53F7\u7801: ",
                user.phone)),
        react_1["default"].createElement("div", { className: "calender-box" },
            react_1["default"].createElement("div", { ref: ref, style: { width: '10s00px', height: '500px', marginTop: '20px' } }))));
};
exports["default"] = User;
