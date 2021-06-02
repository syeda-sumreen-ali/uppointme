import {types} from '../actionTypes'
import {setToast} from './toastAction'
import axios from 'axios'
import messaging from '@react-native-firebase/messaging'
import {Header} from 'react-native/Libraries/NewAppScreen'
// import * as admin from "firebase-admin";
import {FIREBASE_SERVER_KEY} from '@env'
import { store } from '../store'

export const setPushNotificationData = (data, type) => dispatch => {
  let mode =
    type === 'who'
      ? types.SET_WHO
      : type === 'how'
      ? types.SET_HOW
      : types.SET_WHERE
  dispatch({type: mode, payload: data})
}

export const sendPushNotification = (data, token) => async dispatch => {
  if(!Object.keys(data.who).length || !Object.keys(data.where).length || !data.how.length  ){
   dispatch(setToast('error', 'Select how , who and where first'))
  }else{
  // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx', data)
  fetch(`https://fcm.googleapis.com/fcm/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key=${FIREBASE_SERVER_KEY}`,
    },
    body: JSON.stringify({
      to: data.who.token,
      notification: {
        body: `${data.who.name} ${data.how} ${data.where.name}`,
        title: 'Uppoint.me notification',
        content_available: true,
        priority: 'high',
      },
      data: {
        sender: store.getState().user.userDetails.name,
        body: `${data.who.name} ${data.how} ${data.where.name}`,
        title: 'Uppoint.me notification',
        content_available: true,
        priority: 'high',
        who: data.who.name,
        how: data.how,
        where: data.where,
        type: 'NotificationDetails',
      },
    }),
  })
    .then(res => console.log(res))
    .then(response => {
      // console.log(response)
      dispatch(setToast('success', `Your message has been sent to ${data.where.name}`))
    })
    .catch(err => console.log(err))
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

  }
}
