import {types} from '../actionTypes'

const initialState = {
  isAuthenticated: false,
  token: '',
  user: null,
  isLoggedin: false,
  loader: false,
}

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.LOGIN_START:
      return {...state, loader: true}
    case types.LOGIN_SUCCESS:
      return {...state, isLoggedin: true, user: payload}
    case types.LOGIN_FAILED:
      return {...state, loader: false}
    case types.LOGOUT:
      return {...state, isLoggedin: false, user: null}
    default:
      return state
  }
}
export default authReducer
