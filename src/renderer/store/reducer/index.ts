import { combineReducers } from 'redux'
import page from './page'
import code from './code'
import user from './user'
import setting from './setting'

export default combineReducers({
  page,
  code,
  user,
  setting
})

