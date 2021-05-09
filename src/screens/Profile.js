import React, {useState, useEffect} from 'react'
import { StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight } from 'react-native'
import { COLORS, ICONS } from '../constants'
import {connect} from 'react-redux'
import {addUserDetails, getUserDetails, updateUserDetails} from '../store/actions'
import Map from '../component/Map'
import { TouchableOpacity } from 'react-native-gesture-handler'

// import { ScrollView } from 'react-native-gesture-handler'
const Profile = (props) => {
    const [userName, setUserName]=useState('')
    const [location, setLocation]=useState('')

    useEffect(async() => {
     await props.getUserDetails(()=>{
       let userInfo= props.user.userDetails
      if(Object.keys(userInfo).length){
          setUserName(userInfo.name)
          setLocation(userInfo.location)
      } 
      console.log(props.user)})
    
    }, [])



    const handleSubmit =()=>{
      // if(Object.keys(props.user.userDetails).length){
        props.updateUserDetails({name:userName,location:location})
      // }else{
        // props.addUserDetails({name:userName, location:location})
      // }
    }
    return (
      // <ScrollView>

        <View style={styles.container}>
          <View style={{flexDirection:'row'}}>
           {props.user.userDetails&& 
           <View style={{flex:0.35, justifyContent:'center', paddingLeft:'5%'}}>
             <TouchableOpacity onPress={()=>props.navigation.replace('Home')}>
              <ICONS.AntDesign name={"left"} size={28} color={COLORS.dark}/>
             </TouchableOpacity>
            </View>}
            <View style={[{flex:1}, !props.user.userDetails&&{alignItems:'center'}]}>
              <Text style={styles.h1}>{props.user.userDetails.name?'Edit Profile':'Create Profile'}</Text>
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
            <View style={{width:'94%', 
            height:300,
            //  backgroundColor:'red',
              overflow:'hidden', marginHorizontal:'2%'}}>

            <Map location={location} setLocation={setLocation}/>
            </View>
            <TouchableHighlight 
            onPress={(userName&&location)?handleSubmit:()=>{}} style={[styles.button,!(userName&&location)&&{backgroundColor:COLORS.disabled}]}>
                <Text style={styles.buttonText}>{'Submit Details'}</Text>
            </TouchableHighlight>
  
        </View>
                // {/* </ScrollView> */}
    )
}

const mapStateToProps=props=>{
  return{
    user:props.user
  }
}
export default connect(mapStateToProps,{addUserDetails, getUserDetails, updateUserDetails})(Profile)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
    h1: {
        color: COLORS.dark,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '4%',
        marginTop: '5%',
        // elevation:10,
      },
      h2: {
        color: COLORS.dark,
        fontSize: 22,
        alignSelf:'flex-start',
        // textAlign:'left',
        fontWeight: '600',
        marginBottom: '4%',
        paddingLeft:'5%',
        // marginTop: -60,
        // elevation:10,
      },
    textInput: {
        backgroundColor: COLORS.white,
        borderColor:COLORS.primary,
        color:COLORS.dark,
        borderWidth:2,
        borderRadius:4,
        width: '90%',
        marginBottom: '4%',
        fontSize: 16,
        paddingLeft: '4%',
        // elevation: 2,
      },
      button: {
        backgroundColor: COLORS.primary,
        elevation: 10,
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '6%',
        marginBottom:'6%'
      },
      buttonText: {
        color: COLORS.dark,
        fontSize: 19,
        // fontWeight:'bold'
      },
})
