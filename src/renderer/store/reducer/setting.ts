import _ from 'lodash';
import { SettingAction } from '../action/setting';

const settingConfig = {
  editor: {
    mode: 'text/javascript', //模式
    lineNumbers: true, // 行号
    theme: 'ayu-dark', //主体
    tabSize: 2, // tab字符
    smartIndent: true, // 智能缩进
    undoDepth: 200,
    fontSize: 16,
    letterSpacing: 1,
  },
  current: {
    cloud: true,
    position: true,
  }
};

const editorReducer = (state = settingConfig, action: SettingAction) => {
  switch (action.type) {
    case 'setSetting': {
      console.log(action.payload.option)
      return action.payload.option
    }
    case 'changeEditor': {
      let clone = _.cloneDeep(state)
      clone.editor = action.payload.option
      return clone;
    }
    case 'changeCurrent': {
      let clone = _.cloneDeep(state)
      clone.current = action.payload.option
      return clone;
    }
    default: {
      return state;
    }
  }
};

export default editorReducer;
