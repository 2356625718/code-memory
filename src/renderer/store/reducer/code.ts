import _ from 'lodash';
import { CodeAction } from '../action/code';

type Code = {
  id: string,
  title: string,
  code: string
}


const codes: Code[] = []



const codeReducer = (state = codes, action: CodeAction) => {
  switch (action.type) {
    case 'setCode': {
      return action.payload.code;
    }
    default: {
      return state;
    }
  }
};

export default codeReducer;
