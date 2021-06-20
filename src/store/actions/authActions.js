import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {navigationRef} from '../../navigation/RootNavigation'
import {setToast} from './toastAction';
import {types} from '../actionTypes';
import {store} from '../store';
import {setAppStorage, getAppStorage, removeAppStorageByKey} from '../../utils/localstorage';
import {NotificationService} from '../../utils/notificationService';
import { getUserDetails } from './userDetailsActions';

export const register=(email, password,callback)=>async(dispatch)=>{
   try {
  
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
        if (!user.user.emailVerified) {
            auth().onAuthStateChanged(function(user) { 
                if (!user.emailVerified) {
                    user.sendEmailVerification();
                    dispatch(setToast('info','A verification link has sent to your account, Please verify to continue'))
                    callback()
                }
                else {                  
                  //  console.log('Not verified');
                }
             });
        }
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        dispatch(setToast('error', 'That email address is already in use'))
      }
  
      if (error.code === 'auth/invalid-email') {
          dispatch(setToast('That email address is invalid!'))
      }  
      console.error(error);
    });
   } catch (error) {
       console.log(error)
   }
   
}


export const login=(email, password, callback)=>async(dispatch)=>{
    try {
      dispatch({type:types.LOGIN_START})
      //signin with  email and password
      let user = await auth().signInWithEmailAndPassword(email,password)
  
      if(user){

        if(!user.user.emailVerified){
          dispatch({type:types.LOGIN_FAILED})
          dispatch(setToast('error', 'Please verify your email to login'))
     
        }else{
          dispatch({type:types.LOGIN_SUCCESS, payload:user})      
         
          // set id in storage
          setAppStorage('auth',user.user._user.uid)
  
          // get id from storage to inorder to gt data from user second time
          let userid = await getAppStorage('auth')
          
          // get data from users 
          let getRecord=  await firestore().collection('Users').doc(userid||user.user._user.uuid).get()
  
          // get notification token
          let token = await NotificationService.getToken()
  
          //if no record exist then create a basic record with email and token
          if(!getRecord._data){
  
            //user record obj
            let record= {
              email:email,
              id:userid,
              name:null,
              location:null,
              token:token,
              favourites:[],
              createdAt:firestore.FieldValue.serverTimestamp()
            }
            //create user record
            firestore().collection('Users').doc(userid?userid:user.user._user.uuid).set(record)
            //save user record in store
            dispatch({type:types.ADD_USER_DETAILS_SUCCESS, payload:record})
          }else{
            // if already record exist then update token only
            firestore().collection('Users').doc(userid).update({
              token
            })
          }
          //check if name exist in user record if no then go to profile to filled name and location else go home
          dispatch(getUserDetails(()=>store.getState().user.userDetails.name?
          navigationRef.current.navigate('Home'):
          navigationRef.current.navigate('Profile')))
          callback()
        }
      
        
      }  
    } catch (error) {
      console.log("ERORR:",error.code);
      dispatch({type:types.LOGIN_FAILED})
      dispatch(setToast('error',error.message.replace(`[${error.code}]`,'')))

    }
      
 }




 export const logout = ()=>async(dispatch)=>{
  auth()
  .signOut()
  .then(async() =>{
    let userid = await getAppStorage('auth')
        
    // get data from users 
      await firestore().collection('Users').doc(userid).update({token:null})
        dispatch({type:types.LOGOUT})
        navigationRef.current.navigate('Auth')
        removeAppStorageByKey('auth')
    });
 }