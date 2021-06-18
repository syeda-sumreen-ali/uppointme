import {types} from '../actionTypes'
const initialState={
    userDetails:{},
    contactList:[],
    favourites:[],
    locations:[],
    isContactLoading:false,
    isUserLoading:false
}

const userReducer=(state=initialState, {type,payload})=>{
    switch(type){
        case types.ADD_USER_DETAILS_SUCCESS:
            return{...state,userDetails:payload}
        case types.GET_USER_DETAILS_START:
            return{...state,isUserLoading:true}    
        case types.GET_USER_DETAILS_SUCCESS:
            // console.log('eeeeee', payload)
            let data= payload
            // console.log(data)
            return{...state, isUserLoading:false, userDetails : data}
        case types.GET_USER_DETAILS_FAILED:
            return{...state, isUserLoading:false}    
        case types.GET_ALL_CONTACTS_START:
            return {...state, isContactLoading:true}
        case types.GET_ALL_CONTACTS_SUCCESS:
            return {...state, isContactLoading:false, contactList:payload}
        case types.GET_ALL_CONTACTS_FAILED:
            return {...state, isContactLoading:false}
        case types.HANDLE_FAVOURITE:
            return{...state, userDetails:{...state.userDetails,favourites:payload}}
            case types.HANDLE_LOCATION:
                return{...state, userDetails:{...state.userDetails,locations:payload}} 
        case types.LOGOUT:
            return{...state,userDetails:{}}
        default:
            return state
    }
}

export default userReducer