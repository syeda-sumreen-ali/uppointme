import {types} from '../actionTypes'
const initialState={
    userDetails:{},
    contactList:[],
    favourites:[],
    isContactLoading:false
}

export default (state=initialState, {type,payload})=>{
    switch(type){
        case types.ADD_USER_DETAILS_SUCCESS:
            return{...state,userDetails:payload}
        case types.GET_USER_DETAILS_SUCCESS:
            // console.log('eeeeee', payload)
            return{...state, userDetails : payload}
        case types.GET_ALL_CONTACTS_START:
            return {...state, isContactLoading:true}
        case types.GET_ALL_CONTACTS_SUCCESS:
            return {...state, isContactLoading:false, contactList:payload}
        case types.GET_ALL_CONTACTS_FAILED:
            return {...state, isContactLoading:false}
        case types.HANDLE_FAVOURITE:
            return{...state, userDetails:{...userDetails,favourites:payload}}
        case types.LOGOUT:
            return{...state,userDetails:{}}
        default:
            return state
    }
}