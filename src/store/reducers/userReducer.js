import {types} from '../actionTypes'
const initialState={
    userName:'',
    userLocation:{},
    contactList:[],
}

export default (state=initialState, {type,payload})=>{
    switch(type){
        case types.GET_USER_DETAILS_SUCCESS:
            return {...state, contactList:payload}
        default:
            return state
    }
}