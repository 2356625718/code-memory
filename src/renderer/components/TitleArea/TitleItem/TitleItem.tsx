import { List, Input } from 'antd';
import {
  FormOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import React, { useState, useEffect } from 'react'
import { useStore } from 'react-redux';
import { ischangeTitle, deleteCode, changeTitleChoosed } from '@/store/action/code';
import './TitleItem.less';

type IProps = {};

const TitleItem: React.FC<IProps> = () => {
  const store = useStore()

  const startData = store.getState().code.codes
  const [data, setData] = useState<Code[]>(startData)

  const keyDown = (e: any, id: string) => {
    let code = e.keyCode
    if (code === 32) e.preventDefault()
    if (code === 13) store.dispatch(ischangeTitle(id, false, e.target.value))
  }

  useEffect(() => {
    const unSubscribe = store.subscribe(() => {
      const newData = store.getState().code.codes
      setData(newData)
    })
    return () => {
      unSubscribe()
    }
  }, [data])

  return (
    <>
      <List
        size="small"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            className={classNames({
              choosed: item.isTitleChoosed,
              listItem: true
            })}
            style={{borderBottom: 'none'}}
            onClick = {() => store.dispatch(changeTitleChoosed(item.id))}
          >
            <div className='titleItem'>
              { item.ischangeTitle ? <Input type="text" defaultValue={item.title} className='titleInput' onKeyDown={(e) => keyDown(e, item.id)} bordered={false}></Input> : <span>{item.title}</span> }
              <div className='icons'>
                <FormOutlined className='icon' onClick={() => { store.dispatch(ischangeTitle(item.id))}}/>
                <CloseOutlined className='icon' onClick={() => store.dispatch(deleteCode(item.id))}/>
                </div>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default TitleItem;
