import _ from 'lodash'
import { PageAction } from '../action/page'

const pageConfig = {
  pathName: '/user',
}


const pageReducer = (state = pageConfig, action: PageAction) => {
  switch(action.type) {
    case 'changePage': {
      const clone = _.cloneDeep(state)
      let user = sessionStorage.getItem('user')
      clone.pathName = user ? action.payload.pathName : '/user'
      return clone
    }
    default: {
      return state
    }
  }
}

export default pageReducer;