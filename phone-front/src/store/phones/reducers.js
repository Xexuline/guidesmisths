import { SET_PHONE_LIST } from './actions'

const initialState = {
  phoneList: []
}

const actionsMap = {
  [SET_PHONE_LIST]: (state, { payload }) => {
    return {
      ...state,
      phoneList: payload
    }
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}