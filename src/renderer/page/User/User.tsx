import { Avatar, Card, Divider } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { useStore } from 'react-redux';
import * as echarts from 'echarts';
import './User.less';

const User: React.FC = () => {
  let user = JSON.parse(sessionStorage.getItem('user') as string);
  const ref = useRef(null);

  function getVirtulData(year: any) {
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

  useEffect(() => {
    let option = {
      title: {
        top: 30,
        left: 'center',
        text: '代码片段贡献日历图',
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
          borderWidth: 0.5,
        },
        yearLabel: { show: false },
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtulData('2016'),
      },
    };
    if (ref.current) {
      const myChart = echarts.init(ref.current, undefined, {
        width: 1000,
        height: 400,
      });
      myChart.setOption(option);
    }
  }, []);

  return (
    <div className="user-box">
      <Avatar size={128} />
      <div className="user-name">{user.userName}</div>
      <div className="user-info">
        <div>电话号码: {user.phone}</div>
      </div>
      <div className="calender-box">
        <div ref={ref} style={{ width: '10s00px', height: '500px',marginTop: '20px' }}></div>
      </div>
    </div>
  );
};

export default User;
