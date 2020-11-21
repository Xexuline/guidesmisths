import { PhoneService } from '../../services/phone'

export const SET_PHONE_LIST= 'SET_PHONE_LIST'

export class ThunkActions {
  static getPhones = () => (dispatch) => {
    return PhoneService
    .getList()
    .then(({data: phoneList}) => {
      dispatch({type: SET_PHONE_LIST, payload: phoneList })
    })
  }
}