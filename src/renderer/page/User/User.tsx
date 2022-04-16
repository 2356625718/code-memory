import { Avatar, Card, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import { useStore } from 'react-redux'
import './User.less'

const User: React.FC = () => {

  let user = JSON.parse(sessionStorage.getItem('user') as string)

  return (
    <Card className='user-box' hoverable>
      <Avatar size={128}/>
      <div className='user-name'>{user.userName}</div>
      <div className='user-info'>
        <div>
           Phone: {user.phone}
        </div>
        <Divider></Divider>
        <div>
           Password: {user.password}
        </div>
      </div>
    </Card>
  );
};

export default User;
