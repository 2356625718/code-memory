import _ from 'lodash';
import { v4 as uuidv4, v4 } from 'uuid';
import { CodeAction } from '../action/code';

const codeConfig = {
  codes: [
    {
      id: '1',
      title: '未命名',
      code: '',
      isTitleChoosed: true,
      ischangeTitle: false,
    },
  ],
  isChanging: {
    id: '1',
    title: '未命名',
    code: '',
    isTitleChoosed: true,
    ischangeTitle: false,
  },
}



const codeReducer = (state = codeConfig, action: CodeAction) => {
  switch (action.type) {
    // 选中改变
    case 'changeTitleChoosed': {
      const clone = _.cloneDeep(state);
      clone.codes.forEach((item, index) => {
        item.id === action.payload.id
          ? (clone.codes[index].isTitleChoosed = true)
          : (clone.codes[index].isTitleChoosed = false);
      });
      // @ts-ignore
      clone.isChanging = clone.codes.find((item: any) => item.id === action.payload.id)
      return clone;
    }
    // 改变标题名
    case 'ischangeTitle': {
      const clone = _.cloneDeep(state);
      clone.codes.forEach((item, index) => {
        if (!action.payload.ischange) {
          clone.codes[index].ischangeTitle = false
          clone.codes[clone.codes.findIndex(item => item.id === action.payload.id)].title = action.payload.title
        } else {
          item.id === action.payload.id
          ? (clone.codes[index].ischangeTitle = true)
          : (clone.codes[index].ischangeTitle = false);
        }
      });
      return clone;
    }
    // 改变代码片段
    case 'addCode': {
      const clone = _.cloneDeep(state);
      clone.codes.push({
        id: uuidv4(),
        title: '未命名',
        code: '',
        isTitleChoosed: false,
        ischangeTitle: false,
      });
      return clone;
    }
    // 删除代码片段
    case 'deleteCode': {
      if (state.codes.length === 1) return state
      const clone = _.cloneDeep(state);
      clone.codes.splice(clone.codes.findIndex((item => {
        if (item.id === action.payload.id) return true
      })), 1)
      clone.codes[0].isTitleChoosed = true
      clone.isChanging = clone.codes[0]
      return clone;
    }
    case 'changeCode': {
      const clone = _.cloneDeep(state);
      clone.codes[clone.codes.findIndex((item: any) => item.id === action.payload.id)].code = action.payload.code
      return clone;
    }
    case 'setCode': {
      if (!action.payload.code?.isChanging) action.payload.code.isChanging = action.payload.code.codes[0] || {}
      return action.payload.code;
    }
    default: {
      return state;
    }
  }
};

export default codeReducer;
