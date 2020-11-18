import { SET_LOADING } from './actions'

const initialState = {
  loader: false
}

const actionsMap = {
  [SET_LOADING]: (state, { payload }) => {
    return {
      ...state,
      loader: payload
    }
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}