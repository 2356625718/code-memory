import { combineReducers } from 'redux'
import page from './page'
import code from './code'
import user from './user'
import editor from './editor'

export default combineReducers({
  page,
  code,
  user,
  editor
})

