import React, { useRef } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
import 'codemirror/theme/ayu-mirage.css'
import 'codemirror/theme/3024-day.css'
import 'codemirror/theme/idea.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/go/go'
import 'codemirror/mode/python/python'
import 'codemirror/mode/clike/clike'
import './Editor.less'
import { useStore } from 'react-redux';
import { changeCode } from '@/store/action/code';
import { useEffect } from 'react'

type IProps = {
  style?: {
    width?: string,
    height?: string
  },
  isCommunity?: boolean,
  value?: string
}

const Editor: React.FC<IProps> = (props) => {
  const editor = useRef(null)
  let code: any
  const store = useStore()
  let lastId: any

  useEffect(() => {
    if (editor.current && !props.isCommunity) {
      code = CodeMirror.fromTextArea(editor.current, {
        mode: "text/javascript", //模式
        lineNumbers: true,  // 行号
        theme: 'ayu-mirage', // 主题
        tabSize: 2,  // tab字符  
        smartIndent: true, // 智能缩进
      })
      code.setSize(props?.style?.width || '100%', props?.style?.height || '100%')
      code.setValue(store.getState().code.isChanging.code)
      lastId = store.getState().code.isChanging.id
      code.on('change', (el: any, obj: any) => {
        if (obj.origin !== 'setValue') store.dispatch(changeCode(store.getState().code.isChanging.id, code.getValue()))
      })
      store.subscribe(() => {
        let nowCode = store.getState().code.isChanging
        if (nowCode && nowCode.id !== lastId) {
          code.setValue(nowCode.code)
          lastId = nowCode.id
        }
      })
    }
    if (editor.current && props.isCommunity) {
      console.log(props)
      code = CodeMirror.fromTextArea(editor.current, {
        mode: {name: "javascript", json: true},
        lineNumbers: true,
        theme: 'ayu-dark',
        tabSize: 2,
        smartIndent: true,
      })
      code.setSize(props?.style?.width || '100%', props?.style?.height || '100%')
      code.setValue(props.value)
    }
  }, [props.value])



  return (
    <textarea ref={editor}></textarea>
  )
}

export default Editor;