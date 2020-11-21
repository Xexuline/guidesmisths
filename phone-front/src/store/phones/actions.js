import { PhoneService } from '../../services/phone'
import { setLoading } from '../ui/actions'

export const SET_PHONE_LIST= 'SET_PHONE_LIST'

export class ThunkActions {
  static getPhones = () => (dispatch) => {
    dispatch(setLoading(true))
    return PhoneService
    .getList()
    .then(({data: phoneList}) => {
      dispatch({type: SET_PHONE_LIST, payload: phoneList })
      dispatch(setLoading(false))
    })
  }
}