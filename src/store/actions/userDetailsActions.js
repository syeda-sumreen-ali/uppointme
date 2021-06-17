import {types} from '../actionTypes'
import firestore from '@react-native-firebase/firestore';
import {navigationRef} from '../../navigation/RootNavigation'
import {setToast} from './toastAction';
import {getAppStorage} from '../../utils/localstorage';


export const  addUserDetails= (data)=>async(dispatch)=>{

    try {
        let userid= await getAppStorage('auth')
        dispatch({type:types.ADD_USER_DETAILS_START})
       firestore()
        .collection('Users')
        .doc(userid)
        .set({
            name: data.name,
            location: data.location,
            createdAt:firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
             dispatch(setToast('success', 'Profile added successfully'))
             dispatch({type:types.ADD_USER_DETAILS_SUCCESS, payload :data})
            }).then(()=> navigationRef.current.navigate('Home'))
            .catch((err) =>{  throw err; })

    } catch (error) {
        dispatch({type:types.ADD_USER_DETAILS_FAILED})
        dispatch(setToast('error', error))
    }    
}

export const updateUserDetails =(data)=>async(dispatch)=>{
    try {
        const userid = await getAppStorage('auth')
        dispatch({type:types.UPDATE_USER_DETAILS_START})


         await firestore().collection('Users').doc(userid).update({
            name:data.name,
            location:data.location
        })
        dispatch({type:types.UPDATE_USER_DETAILS_SUCCESS,payload:data})
        dispatch(getUserDetails())
        dispatch(setToast('success','Profile updated successfully'))
        setTimeout(() => {
            navigationRef.current.navigate('Home')
        }, 4000);
    } catch (error) {
        dispatch({type:types.UPDATE_USER_DETAILS_FAILED })
        dispatch(setToast('error',error))
        console.log(error)
    }
}

export const getAllContacts=(callback)=>async(dispatch)=>{
    try {
        dispatch({type:types.GET_ALL_CONTACTS_START})
        let response= await firestore().collection('Users').orderBy('name').get()
        if(response){
             let userDetails=[]
            response.docs.forEach(doc =>{
                // console.log(doc._data);
                 userDetails.push(doc._data)});  
            dispatch({type:types.GET_ALL_CONTACTS_SUCCESS,payload:userDetails})
         }   
         callback && callback()
    } catch (error) {
        dispatch({type:types.GET_ALL_CONTACTS_FAILED})
        dispatch(setToast('error',error))
        console.log(error)
    }
}


export const handleFavourite=(favourites, type)=>async(dispatch)=>{
    try {
        console.log(favourites)
        const userid= await getAppStorage('auth')
        getUserDetails()
        firestore().collection('Users').doc(userid).update({
            favourites
        })
        dispatch({type:types.HANDLE_FAVOURITE, payload:favourites})
        if(type==='remove'){
            dispatch(setToast('success','Removed from favourites'))
        }else{
            dispatch(setToast('success','Marked as favourite'))
        }
       
    } catch (error) {
        console.log(error)   
    }
}

export const getUserDetails =(callback)=>async(dispatch)=>{
    
    try {
        const userid = await getAppStorage('auth')    
        dispatch({type:types.GET_USER_DETAILS_START})
        const user = await firestore().collection('Users').doc(userid).get();
        if (user._data){
            dispatch({type:types.GET_USER_DETAILS_SUCCESS, payload:user._data})
            dispatch(getAllContacts())
            callback && callback('Home')
            //    console.log("getUserDetails",user._data)
        }else{
            dispatch({type:types.GET_USER_DETAILS_FAILED})
             callback && callback('Profile')
        }
        
    } catch (error) {
        dispatch({type:types.GET_USER_DETAILS_FAILED})

        console.log(error)   
    }
}