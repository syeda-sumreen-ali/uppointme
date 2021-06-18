import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  SafeAreaView
} from 'react-native'
import { COLORS, ICONS } from '../constants'
import { connect } from 'react-redux'
import {
  addUserDetails,
  getUserDetails,
  setToast,
  updateUserDetails,
} from '../store/actions'
import Map from '../component/Map'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StatusBar } from 'react-native'
import { Platform } from 'react-native'

const Profile = props => {
  const [userName, setUserName] = useState('')
  const [location, setLocation] = useState('')

  useEffect(async () => {

    await props.getUserDetails(() => {
      let userInfo = props.user.userDetails
      console.log('USER INFO', props)
      if (Object.keys(userInfo).length) {
        setUserName(userInfo.name)
        setLocation(userInfo.location)
      }
      console.log(props.user)
    })
  }, [Object.keys(props.user.userDetails).length])

  const handleSubmit = () => {
    const {setToast, user}= props
    const {userDetails, contactList,} = user;

    let isUserExist =contactList.find(data=> data.name=== userName)
    if(isUserExist){
      setToast('error','User with this name already exist')
    }else{
      props.updateUserDetails({name: userName, location: location})
    }
   
  }
  return (
   
    <>
      <StatusBar animated={true} barStyle="dark-content" hidden={false} backgroundColor={COLORS.yellow} translucent={false} />
      <View style={[styles.container, Platform.OS==='ios'&&{marginTop:40}]}>
        <View style={{ flexDirection: 'row', marginBottom:15 }}>
          {props.user.userDetails && (
            <View
              style={{ flex: 0.35, justifyContent: 'center', paddingLeft: '5%' }}>
              <TouchableOpacity onPress={() => props.navigation.replace('Home')}>
                <ICONS.AntDesign name={'left'} size={28} color={COLORS.dark} />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={[
              { flex: 1 },
              !props.user.userDetails && { alignItems: 'center' },
            ]}>
            <Text style={styles.h1}>
              {props.user.userDetails.name ? 'Edit Profile' : 'Create Profile'}
            </Text>
          </View>
        </View>
        <Text style={styles.h2}>Username:</Text>
        <TextInput
          placeholderTextColor={'gray'}
          style={styles.textInput}
          placeholder={'Enter Username'}
          value={userName}
          onChangeText={val => setUserName(val)}
        />
        <Text style={styles.h2}>Select Location</Text>
        <View
          style={{
            width: '94%',
            height: 300,
            //  backgroundColor:'red',
            overflow: 'hidden',
            marginHorizontal: '2%',
          }}>
          <Map location={location} setLocation={setLocation} />
        </View>
        <TouchableHighlight
          onPress={userName && location ? handleSubmit : () => { }}
          style={[
            styles.button,
            !(userName && location) && { backgroundColor: COLORS.disabled },
          ]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    </>
  )
}

const mapStateToProps = props => {
  console.log("props.user",props.user)
  return {
    user: props.user,
    
  }
}
export default connect(mapStateToProps, {
  addUserDetails,
  getUserDetails,
  updateUserDetails,
  setToast
})(Profile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  h1: {
    color: COLORS.dark,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '6%',
    marginTop: '5%',
    marginLeft:'5%'
  },
  h2: {
    color: COLORS.dark,
    fontSize: 22,
    alignSelf: 'flex-start',
    fontWeight: '600',
    marginBottom: '4%',
    paddingLeft: '5%',
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    color: COLORS.dark,
    borderWidth: 2,
    borderRadius: 4,
    width: '90%',
    marginBottom: '4%',
    fontSize: 16,
    
    paddingLeft: '4%',
    height: 45
  },
  button: {
    backgroundColor: COLORS.primary,
    borderWidth: 4,
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '6%',
    textTransform:'uppercase',
    marginBottom: '6%',
  },
  buttonText: {
    color: COLORS.dark,
    fontSize: 19,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
})
