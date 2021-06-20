import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {connect} from 'react-redux'
import {COLORS} from '../constants';
import {NotificationService} from '../utils/notificationService';
import {setToast, register,login, getUserDetails} from '../store/actions'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Loader from '../component/Loader'

const Auth = (props) => {

  const [pageType, setPageType]= useState('signin')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const  navigateToProfileOrHome=(page)=>{
     if(props.userDetails.name){
       props.navigation.replace('Home')
     }else{
      props.navigation.replace('Profile')
     }
  }
  useEffect(async() => {
    NotificationService.getToken();
    if(props.isLoggedIn){
      await props.getUserDetails((page)=>navigateToProfileOrHome(page))

    }
  
  },[props.isLoggedIn]);

  const validateEmail=(email)=> {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  const handleAuth = () => {
    if(!email|| !password){
    return  props.setToast('error','Required fields are missing')
    }
    if(email && !validateEmail(email)){
    return  props.setToast('error','Invalid email address')
    }
    if(password.length>0 && password.length<6){
     return props.setToast('error','Password must be 6 characters long')
    }

    pageType==='signup'?props.register(email,password,clearState):props.login(email,password,clearState)
  };
  const clearState=()=>{
    setEmail('')
    setPassword('')
  }
  return (
    <View style={styles.container}>
      {props.loader && <Loader/> }
      <Text style={styles.h1}>{pageType==='signup'?'Create Account':'Sign In'}</Text>
      <Text style={styles.caption}>
      {pageType==='signup'?
        'Don\'t have an account create now it will take less then two minutes':
        'Sign in to enjoy the app now!'
        }
      </Text>
      <TextInput
        keyboardType={'email-address'}
        style={styles.textInput}
        placeholderTextColor={'black'}
        placeholder={'Enter email'}
        value={email}
        onChangeText={val => setEmail(val)}
      />

      <TextInput
        secureTextEntry
        style={styles.textInput}
        placeholderTextColor={'black'}
        placeholder={'Enter password'}
        value={password}
        onChangeText={val => setPassword(val)}
      />
      <TouchableHighlight onPress={handleAuth} style={styles.button}>
        <Text style={styles.buttonText}>{pageType==='signup'?'Create Account':'Sign In'}</Text>
      </TouchableHighlight>

       {pageType==='signup'? 
       <TouchableWithoutFeedback onPress={()=>{
         clearState();
         setPageType('signin');
         }}> 
          <Text style={styles.bottomText}>Already have an acount ? <Text style={{fontWeight:'bold'}}>Sign in</Text></Text>
        </TouchableWithoutFeedback>
       : <TouchableWithoutFeedback onPress={()=>{
        clearState(),      setPageType('signup');
         
         }}> 
          <Text style={styles.bottomText}>{'Don\'t have an acount? '} <Text style={{fontWeight:'bold'}}>Create now</Text></Text>
        </TouchableWithoutFeedback>}
    </View>
  );
};
const mapStateToProps= props=>{
 return{
    userDetails:props.user,
    loader:props.user.loader,
    isLoggedIn:props.auth.isLoggedIn,
  };
}
export default connect(mapStateToProps, {setToast, register,login, getUserDetails})(Auth);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  h1: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: '4%',
    marginTop: -60,
    textTransform:'uppercase'
  },
  caption: {
    color: 'black',
    fontSize: 16,
    marginBottom: 20,
    width: '90%',
    paddingLeft: '2%',
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderWidth:2,
    width: '90%',
    height:45,
    marginBottom: '4%',
    fontSize: 16,
    paddingLeft: '4%',
    elevation: 2,
    color:COLORS.dark
  },
  button: {
    backgroundColor: COLORS.primary,
    borderWidth:4,
    // elevation: 10,
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
  },
  buttonText: {
    color: 'black',
    fontSize: 19,
    textTransform:'uppercase',
    fontWeight:'bold'
  },
  bottomText:{
    marginTop:'4%',
    fontSize:16,
    color:'black'
  }
});
