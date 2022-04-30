import React, { useRef, useEffect } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-dark.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/idea.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/go/go';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import { useStore } from 'react-redux';
import './Editor.less';
import { useState } from 'react';

type IProps = {
  style?: {
    width?: string;
    height?: string;
  };
  data?: any;
  id?: any;
  changeCode?: any;
  readOnly?: boolean;
};

let change = false;

const Editor: React.FC<IProps> = (props) => {
  const store = useStore();
  const editor = useRef<any>(null);
  const editorSetting = store.getState().setting.editor;
  let [code, setCode] = useState<any>(null);

  const setStyle = () => {
    const el: any = document.getElementsByClassName('CodeMirror')[0];
    const gutter: any =
      document.getElementsByClassName('CodeMirror-gutters')[0];
    el.style.fontSize = editorSetting.fontSize + 'px';
    el.style.letterSpacing = editorSetting.letterSpacing + 'px';
    el.style.backgroundColor = editorSetting.backgroundColor;
    gutter.style.backgroundColor = editorSetting.backgroundColor;
  };

  useEffect(() => {
    if (editor.current && !code) {
      // 实例化代码编辑器
      let code = CodeMirror.fromTextArea(
        editor.current,
        Object.assign({}, editorSetting, { readOnly: props?.readOnly })
      );
      // 设置样式
      code.setSize(
        props?.style?.width || '100%',
        props?.style?.height || '100%'
      );
      setStyle();
      // 编辑响应
      if (!props.readOnly) {
        code.on('change', () => {
          if (!change) props.changeCode(code.getValue());
          else change = false
        });
      }
      change = true;
      //设置初始值
      code && code.setValue(props.data);
      // 保存代码编辑器实例
      setCode(code);
    }
  }, []);

  useEffect(() => {
    if (props?.id) {
      change = true;
      code && code.setValue(props.data);
    }
  }, [props?.id]);

  return <textarea ref={editor}></textarea>;
};

export default Editor;
