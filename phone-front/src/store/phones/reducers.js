import { SET_PHONE_LIST, SET_PHONE_DESC } from './actions'

const initialState = {
  phoneList: [],
  phoneInfo: {
    id: '',
    name: '',
    manufacturer: '',
    description: '',
    color: '',
    price: '',
    imageFileName: '',
    screen: '',
    processor: '',
    ram: ''
  }
}

const actionsMap = {
  [SET_PHONE_LIST]: (state, { payload }) => {
    return {
      ...state,
      phoneList: payload
    }
  },
  [SET_PHONE_DESC]: (state, { payload }) => {
    return {
      ...state,
      phoneInfo: { 
        ...state.phoneInfo,
        ...payload
      }
    }
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}