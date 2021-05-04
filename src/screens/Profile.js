import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native'
import { COLORS } from '../constants'
import {connect} from 'react-redux'
import {addUserDetails} from '../store/actions'
const Profile = (props) => {
    const [userName, setUserName]=useState('')

    const handleSubmit =()=>{
      props.addUserDetails({name:userName})
    }
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>User Profile</Text>
            <TextInput
                secureTextEntry
                style={styles.textInput}
                placeholder={'Enter Username'}
                value={userName}
                onChangeText={val => setUserName(val)}
            />
            <TouchableHighlight onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Submit Details</Text>
            </TouchableHighlight>
  
        </View>
    )
}

const mapStateToProps=props=>{
  return{
    user:props.user
  }
}
export default connect(mapStateToProps,{addUserDetails})(Profile)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.primary,
  },
    h1: {
        color: COLORS.dark,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '4%',
        marginTop: -60,
        // elevation:10,
      },
    textInput: {
        backgroundColor: COLORS.white,
        borderColor:COLORS.primary,
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
        marginTop: '2%',
      },
      buttonText: {
        color: COLORS.dark,
        fontSize: 19,
        // fontWeight:'bold'
      },
})
