import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import{COLORS} from '../../constants'

const Register = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

   const  handleRegister=()=>{
        alert(name+password)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Create Account</Text>
            <Text style={styles.caption}>Don't have an account create now it will take less then two minutes</Text>
            <TextInput 
            keyboardType={'email-address'}
            style={styles.textInput} 
            placeholder={'Enter email'}
            value={name} onChangeText={(val)=>setName(val)}/>

            <TextInput   
            secureTextEntry
            style={styles.textInput} 
            placeholder={'Enter password'}
            value={password} onChangeText={(val)=>setPassword(val)}/>
            <TouchableHighlight
            onPress={handleRegister}
            style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableHighlight>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.primary   
    },
    h1:{
        color:COLORS.white,
        fontSize:30,
        fontWeight:'bold',
        marginBottom:'4%',
        marginTop:-60,
        // elevation:10,
    },
    caption:{
        color: COLORS.white,
        fontSize:16,
        marginBottom:20,
        width:'90%',
        paddingLeft:'2%'
    },
    textInput:{
       backgroundColor:COLORS.white,
       width:'90%',
       marginBottom:'4%',
       fontSize:16,
       paddingLeft:'4%',
       elevation:2,
    },
    button:{
        backgroundColor:COLORS.primary,
        elevation:10,
        width:'90%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginTop:'2%'
    },
    buttonText:{
        color:COLORS.dark,
        fontSize:19,
        // fontWeight:'bold'
    }
})
