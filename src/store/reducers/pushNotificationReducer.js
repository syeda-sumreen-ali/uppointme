import {types} from '../actionTypes'

const initialState = {
  how: '',
  who: '',
  where: '',
  notificationData: {},
}
const pushNotificationReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SET_HOW:
      return {...state, how: payload}
    case types.SET_WHO:
      return {...state, who: payload}
    case types.SET_WHERE:
      return {...state, where: payload}
    case types.SENT_PUSH_NOTIFICATION:
      return {...state, notificationData: payload}
    case types.CLEAR_PUSH_NOTIFICATION_DATA:
      return {...state, how: '', who: '', where: '', notificationData: {}}
    default:
      return state
  }
}

export default pushNotificationReducer
