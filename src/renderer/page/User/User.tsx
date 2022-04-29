import { Avatar, Button, Card, Divider, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';
import { useStore } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as echarts from 'echarts';
import CodeRequest from 'request/code';
import userRequest from 'request/user';
import { cosUpload, cosDown } from 'utils/cos'
import './User.less';

const User: React.FC = () => {
  let user = JSON.parse(sessionStorage.getItem('user') as string);
  const ref = useRef(null);

  const [upload, setUpload] = useState({
    loading: false,
    imgUrl: '',
  })

  const getDate = async () => {
    let res = await CodeRequest.getCreateDate({
      userId: user.id,
    });
    if (res.data.status) {
      return res.data.data;
    }
  };

  useEffect(() => {
    console.log(user)
    setUpload({
      ...upload,
      loading: false,
      imgUrl: user.img || 'https://test-1304439477.cos.ap-chengdu.myqcloud.com/IMG_7898.PNG'
    })
    getDate().then((res) => {
      let option = {
        title: {
          top: 30,
          left: 'center',
          text: '代码片段贡献日历图',
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          type: 'piecewise',
          pieces: [
            { gte: 4, label: '>= 4' },
            { gte: 3, lt: 4, label: '3' },
            { gte: 2, lt: 3, label: '2' },
            { gte: 1, lt: 2, label: '1'},
            { gte: 0, lt: 1, label: '0'},
          ],
          outOfRange: {
            color: '#eee',
          },
          top: '0',
          textStyle: {
            color: '#000',
          },
        },
        calendar: {
          top: 180,
          left: 30,
          right: 30,
          cellSize: [40, 40],
          range: new Date().getFullYear() + '',
          itemStyle: {
            borderWidth: 0.5,
          },
          yearLabel: { show: false },
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: res,
        },
      };
      if (ref.current) {
        const myChart = echarts.init(ref.current, undefined, {
          width: 1000,
          height: 500,
        });
        myChart.setOption(option);
      }
    });
  }, []);

  const handleChange = (info: any) => {
    console.log(info)
    if (info.file.status === 'uploading') {
      setUpload({
        ...upload,
        loading: true
      })
      return
    }
  };

  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('图片类型支持.jpg,.png,.JPG,.PNG结尾');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('文件大小限制2M');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadButton = (
    <div>
      {upload.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );

  const uploadImg = async (file: any) => {
    if (!beforeUpload(file.file)) {
      setUpload({
        ...upload,
        loading: false
      })
      return
    }
    const extname = window.utils.path.extname(file.file.name)
    const fileName = file.filename + '_' + uuidv4() + extname
    let res: any = await cosUpload(fileName, file.file)
    if (res) {
      console.log(res)
      message.success('上传成功')
      let res2 = await userRequest.updateImg({
        id: user.id,
        img: 'https://' + res.Location
      })
      if (res2.data.status) {
        setUpload({
          ...upload,
          imgUrl: 'https://' + res.Location,
          loading: false
        })
        return
      }
    } else {
      message.error('上传失败')
    }
    setUpload({
      ...upload,
      loading: false
    })
  }
 

  return (
    <div className="user-box">
      <div className='login-out'><Button type="default" danger>退出登录</Button></div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        accept=".png,.jpg,.PNG,.JPG"
        customRequest={(file: any) => uploadImg(file)}
      >
        {upload.imgUrl ? <img src={upload.imgUrl} alt="avatar" style={{ width: '180px', height: '180px', borderRadius: '50%' }} /> : uploadButton}
      </Upload>
      <div className="user-name">{user.userName}</div>
      <div className="user-info">
        <div>电话号码: {user.phone}</div>
      </div>
      <div className="calender-box">
        <div
          ref={ref}
          style={{ width: '1000px', height: '500px', marginTop: '20px' }}
        ></div>
      </div>
    </div>
  );
};

export default User;
