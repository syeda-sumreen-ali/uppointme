import {types} from '../actionTypes'
import { setToast } from './toastAction'
import axios from 'axios'
import messaging from '@react-native-firebase/messaging';
import { Header } from 'react-native/Libraries/NewAppScreen';
// import * as admin from "firebase-admin";
import {FIREBASE_SERVER_KEY} from "@env"



export const setPushNotificationData = (data, type) => (dispatch) => {   
    let mode = type==='who' ? types.SET_WHO: type==='how'? types.SET_HOW : types.SET_WHERE
    dispatch({type: mode , payload:data})
}


export const sendPushNotification = (data, token)=>async(dispatch)=>{
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx",FIREBASE_SERVER_KEY)
    fetch(`https://fcm.googleapis.com/fcm/send`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        Authorization:`key=${FIREBASE_SERVER_KEY}`
      },
      body: JSON.stringify({
        to:token,
        notification:{
          body :`${data.who.name} ${data.how} ${data.where.name}`,
          title:"Uppoint.me notification",
          content_available:true,
          priority:"high"
        },
        data:{
          body :`${data.who.name} ${data.how} ${data.where.name}`,
          title:"Uppoint.me notification",
          content_available:true,
          priority:"high",
          who:data.who,
          how:data.how,
          where:data.where,
          type:'notificationDetails'
        }
      })
    })
  // 
    // console.log("sendPsuhNotification==========",data,token)

    // if(data.how.length && Object.keys(data.who).length && Object.keys(data.where).length){
    //   let headers= new Headers({
    //     'Content-Type':'application/json',
    //     'Authorization':'key='+token
    //   })
    // let response = await fetch('https://fcm.googleapis.com/fcm/send',
    // {method:'POST', headers, body:JSON.stringify})

    // }else{
    //     dispatch(setToast('error','select how , who and where!'))

    // }
}
