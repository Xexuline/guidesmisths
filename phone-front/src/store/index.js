import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import ui from './ui/index'
import phones from './phones/'

const rootReducer =  combineReducers({
  ui,
  phones
})

export const store = createStore(rootReducer, applyMiddleware(reduxThunk))