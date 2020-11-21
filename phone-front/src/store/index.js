import { combineReducers } from 'redux'
import ui from './ui/index'
import phones from './phones/'

export default combineReducers({
  ui,
  phones
})