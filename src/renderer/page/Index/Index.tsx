import React from 'react'
import { Row, Col } from 'antd'
import Title from './Title/Title'
import Content from './Content/Content'
import './Index.less'

const Index: React.FC = () => {
  return (
    <Row className='index-content'>
      <Col span={4}>
        <Title></Title>
      </Col>
      <Col span={20} className="content-box">
        <Content></Content>
      </Col>
    </Row>
  )
}

export default Index;