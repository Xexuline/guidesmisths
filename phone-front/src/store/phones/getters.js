import { createSelector } from 'reselect'

export const getPhonesState = (state) => state.phones

export const getPhonesList = createSelector(getPhonesState, state => state.phoneList)
export const getPhoneInfo = createSelector(getPhonesState, state => state.phoneInfo)