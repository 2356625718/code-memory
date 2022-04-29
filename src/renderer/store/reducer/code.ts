import _ from 'lodash';
import { CodeAction } from '../action/code';

type Code = {
  id: string,
  title: string,
  code: string
}

// 初始值
const codes: Code[] = []

const codeReducer = (state = codes, action: CodeAction) => {
  switch (action.type) {
    // 设置代码片段数据
    case 'setCode': {
      return action.payload.code;
    }
    default: {
      return state;
    }
  }
};

export default codeReducer;
