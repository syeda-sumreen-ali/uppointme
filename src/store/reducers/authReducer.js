import { types } from "../actionTypes";

const initialState = {
  isAuthenticated: false,
  token: '',
  user: null,
  isLoggedin:false
};

export default (state = initialState, {type,payload}) => {
  switch (type) {
    case types.LOGIN:
      return{...state, isLoggedin:true, user:payload}
    case types.LOGOUT:
      return{...state, isLoggedin:false, user:null}
    default:
      return state;
  }
};
