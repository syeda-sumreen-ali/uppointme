import auth from '@react-native-firebase/auth';
import {navigationRef} from '../../navigation/RootNavigation'
import {setToast} from './toastAction';
import {types} from '../actionTypes';
import {store} from '../store';
import {setAppStorage,removeAppStorageByKey} from '../../utils/localstorage';

export const register=(email, password)=>async(dispatch)=>{
   try {
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
        console.log(user)
        if (!user.emailVerified) {
            auth().onAuthStateChanged(function(user) { 
                if (!user.emailVerified) {
                    user.sendEmailVerification();
                    dispatch(setToast('info','A verification link has sent to your account, Please verify to continue'))
                }
                else {
                   console.log('Not verified');
                }
             });
        }
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        dispatch(setToast('error', 'That email address is already in use'))
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
          dispatch(setToast('That email address is invalid!'))
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
    // console.log(response)
    // console.log("sdasdasdasdasdasdsad",auth)
   } catch (error) {
       console.log(error)
   }
   
    // console.log('register') 

}

export const login=(email, password)=>async(dispatch)=>{
    // console.log('login') 

    auth()
  .signInWithEmailAndPassword(email,password)
  .then((user) => {
      dispatch({type:types.LOGIN, payload:user})
      dispatch(updateTokenInProfile())
      console.log("user logged in", user.user._user.uid)
      setAppStorage('auth',user.user._user.uid)
        // console.log(store.getState())
        Object.keys(store.getState().user.userDetails).length>0?
          navigationRef.current.navigate('Home'):
          navigationRef.current.navigate('Profile')
  })
  .catch(error => {
    if (error.code === 'auth/invalid-email') {
        dispatch(setToast('error','The email address is invalid!'))
    }

    console.error(error);
  });
 }


 export const updateTokenInProfile = () => async () => {
  let userid = await getAppStorage('auth');
  console.log("UPDATE TOKEN CALLEDDDD")
  firestore()
    .collection('Users')
    .doc(userid)
    .update({
      token: await NotificationService.getToken(),
    })
    .then(() => {
      console.log('token updated successfully');
    });
};

 export const logout = ()=>async(dispatch)=>{
  auth()
  .signOut()
  .then(() =>{
    dispatch({type:types.LOGOUT})
     console.log('User signed out!')
     navigationRef.current.navigate('Auth')
     removeAppStorageByKey('auth')
    });
    //  console.log('logout')
 }