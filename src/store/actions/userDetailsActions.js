import {types} from '../actionTypes'
import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';

export const  addUserDetails= (data)=>async(dispatch)=>{

    try {
        console.log('rumnmmnnnnnnnnnnnnnnnnnn')
        dispatch({type:types.ADD_USER_DETAILS_START})
        firestore()
            .collection('Users')
            .add({
            name: data.name,
            // location: data.location,
            createdAt:firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                dispatch({type:types.ADD_USER_DETAILS_SUCCESS})
                console.log('User added!');
                // console.log('Use Naviagtion', useNavigation)
                // useNavigation.navigate('Home')
            })
            .catch((err) =>{ throw err; })

    } catch (error) {
        dispatch({type:types.ADD_USER_DETAILS_FAILED})
        console.log('firebase add user error',error);
    }
    
}

export const getUserDetails=()=>async(dispatch)=>{
    try {
        dispatch({type:types.GET_USER_DETAILS_START})
        let userDetails=[]
         let response= await firestore().collection('Users').orderBy('name').get()
         if(response){
            dispatch({type:types.GET_USER_DETAILS_START})
            response.forEach(doc => {
                userDetails.push(doc.data)
            });  
            console.log(response)
         }   
    } catch (error) {
        console.log(error)
    }
}


