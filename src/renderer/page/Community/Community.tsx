import React, { useState } from 'react'
import { Card, Row, Col, Divider, Button, Checkbox } from 'antd'
import './Community.less'
import CodeItem from './Codeitem/CodeItem'
import Share from './Share/Share'

const Community: React.FC = () => {

  const [isCollect, setIsCollect] = useState(false)
  return (
    <Row className='community-box'>
      <Col span={18}>
        <Card>
          <CodeItem isCollect={isCollect}></CodeItem>
        </Card>
      </Col>
      <Col span={5} offset={1}>
        <Card>
            我的收藏<Checkbox className='my-collect' onChange={() => setIsCollect(!isCollect)}></Checkbox>
          <Divider></Divider>
          <Share></Share>
        </Card>
      </Col>
    </Row>
  )
}

export default Community;