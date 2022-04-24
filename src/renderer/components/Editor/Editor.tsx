import React, { useRef, useEffect } from 'react'
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
import { useStore } from 'react-redux'
import './Editor.less'

type IProps = {
  style?: {
    width?: string,
    height?: string
  },
  data?: any,
  changeCode?: any,
  readOnly?: boolean,
}

const Editor: React.FC<IProps> = (props) => {
  const store = useStore()
  const editor = useRef(null)
  const editorSetting = store.getState().editor
  console.log(editorSetting)
  let code: any

  const setStyle = () => {
    const el: any = document.getElementsByClassName('CodeMirror')[0]
    const gutter: any = document.getElementsByClassName('CodeMirror-gutters')[0]
    el.style.fontSize = editorSetting.fontSize
    el.style.letterSpacing = editorSetting.letterSpacing
    el.style.backgroundColor = editorSetting.backgroundColor
    gutter.style.backgroundColor =  editorSetting.backgroundColor
  }

  useEffect(() => {
    if (editor.current) {
      code = CodeMirror.fromTextArea(editor.current, editorSetting)
      code.setSize(props?.style?.width || '100%', props?.style?.height || '100%')
      code.setValue(props.data)
      setStyle()
      if (!props.readOnly) {
        code.on('change', () => {
          props.changeCode(code.getValue())
        })
      }
    }
  }, [])



  return (
    <textarea ref={editor}></textarea>
  )
}

export default Editor;