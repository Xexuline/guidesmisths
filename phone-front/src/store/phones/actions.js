import { PhoneService } from '../../services/phone'

export const SET_PHONE_LIST= 'SET_PHONE_LIST'
export const SET_PHONE_DESC= 'SET_PHONE_DESC'

export class ThunkActions {
  static getPhones = () => async (dispatch) => {
    const { data: phoneList } = await PhoneService.getList()

    dispatch({type: SET_PHONE_LIST, payload: phoneList })
  }

  static getPhoneInfo = (id) => async (dispatch) => {
    const { data: phoneInfo } = await PhoneService.getInfo(id)
    const { _id, timestamp, __v, ...rest } = phoneInfo

    dispatch({ type: SET_PHONE_DESC, payload: { ...rest, id: _id } })
  }

  static removePhone = (id) => async () => {
    return await PhoneService.remove(id)
  }

  static updatePhone = (updatedInfo) => async (dispatch) => {
    const {id, ...info} = updatedInfo
    let infoToUpdate
    if(info.imageFileName) {
      infoToUpdate = new FormData()
      Object.entries(info).forEach(([key, value]) => {
        infoToUpdate.append(key, value)
      })
    } else {
      infoToUpdate = info
    }
    

    const { data: phoneInfo } = await PhoneService.update(id, infoToUpdate)
    const { _id, timestamp, __v, ...rest } = phoneInfo

    return dispatch({ type: SET_PHONE_DESC, payload: { ...rest, id: _id } })
  }
}