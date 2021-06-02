import { types } from "../actionTypes";

const initialState = {
  isAuthenticated: false,
  token: '',
  user: null,
  isLoggedin:false
};

const authReducer= (state = initialState, {type,payload}) => {
  switch (type) {
    case types.LOGIN:
      return{...state, isLoggedin:true, user:payload}
    case types.LOGOUT:
      return{...state, isLoggedin:false, user:null}
    default:
      return state;
  }
};
export default authReducer