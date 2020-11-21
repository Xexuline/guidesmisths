import { createSelector } from 'reselect'

export const getPhonesState = (state) => state.phones

export const getPhonesList = createSelector(getPhonesState, state => state.phoneList)