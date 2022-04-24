import _ from 'lodash';
import { EditorAction } from '../action/editor';

const editorConfig = {
  mode: 'text/javascript', //模式
  lineNumbers: true, // 行号
  theme: 'ayu-dark', //主体
  tabSize: 2, // tab字符
  smartIndent: true, // 智能缩进
  undoDepth: 200,
  fontSize: 16,
  letterSpacing: 1,
};

const editorReducer = (state = editorConfig, action: EditorAction) => {
  switch (action.type) {
    case 'changeEditor': {
      return action.payload.option;
    }
    default: {
      return state;
    }
  }
};

export default editorReducer;
