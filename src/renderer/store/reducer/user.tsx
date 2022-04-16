import _ from 'lodash'
import { UserAction } from '../action/user'

const userConfig = {
  
}


const userReducer = (state = userConfig, action: UserAction) => {
  switch(action.type) {
    case 'setUser': {
      console.log(action)
      let clone = _.cloneDeep(state)
      clone = action.payload.user
      return clone
    }
    default: {
      return state
    }
  }
}

export default userReducer;