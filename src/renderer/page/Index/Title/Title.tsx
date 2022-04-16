import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useStore } from 'react-redux';
import TitleArea from '@/components/TitleArea/TitleArea'
import './Title.less'
import { addCode } from '@/store/action/code';

const Title: React.FC = () => {

  const store = useStore()

  return (
    <div className='title-content'>
      <div className='title-header'>
        <span>代码片段标题</span>
        <Tooltip title="新增" placement="right">
          <PlusOutlined onClick={() => store.dispatch(addCode())}/>
        </Tooltip>
      </div>
      <TitleArea></TitleArea>
    </div>
  )
}

export default Title;