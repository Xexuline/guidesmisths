import { PhoneService } from '../../services/phone'

export const SET_PHONE_LIST= 'SET_PHONE_LIST'
export const SET_PHONE_DESC= 'SET_PHONE_DESC'

export class ThunkActions {
  static getPhones = () => async (dispatch) => {
    const { data: phoneList } = await PhoneService.getList()
    dispatch({type: SET_PHONE_LIST, payload: phoneList })
  }
}