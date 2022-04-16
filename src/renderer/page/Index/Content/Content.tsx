import React from 'react';
import './Content.less'
import Editor from '@/components/Editor/Editor'

const Content: React.FC = () => {
  return (
    <div className='content-box'>
      <Editor></Editor>
    </div>
  );
};

export default Content;
