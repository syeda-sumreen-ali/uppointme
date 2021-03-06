import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux'
import {COLORS} from '../constants';
import {NotificationService} from '../utils/notificationService';
import {setToast, register,login} from '../store/actions'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const Auth = (props) => {

  const [pageType, setPageType]= useState('signin')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const  navigateToProfileOrHome=()=>{
       
    if(!Object.keys(props.user)){
        props.navigation.replace('Profile')
    }else{
        props.navigation.replace('Home')
    }
        
    }
  useEffect(async() => {
    NotificationService.getToken();
    await props.getUserDetails(()=>navigateToProfileOrHome())
  
  },[]);

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

    pageType==='signup'?props.register(email,password):props.login(email,password)
    // this.props.register
    // navigation.navigate('Profile', {});
  };
  return (
    <View style={styles.container}>
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
        placeholderTextColor={'gray'}
        placeholder={'Enter email'}
        value={email}
        onChangeText={val => setEmail(val)}
      />

      <TextInput
        secureTextEntry
        style={styles.textInput}
        placeholderTextColor={'gray'}
        placeholder={'Enter password'}
        value={password}
        onChangeText={val => setPassword(val)}
      />
      <TouchableHighlight onPress={handleAuth} style={styles.button}>
        <Text style={styles.buttonText}>{pageType==='signup'?'Create Account':'Sign In'}</Text>
      </TouchableHighlight>

       {pageType==='signup'? 
       <TouchableWithoutFeedback onPress={()=>setPageType('signin')}> 
          <Text style={styles.bottomText}>Already have an acount ? <Text style={{fontWeight:'bold'}}>Sign in</Text></Text>
        </TouchableWithoutFeedback>
       : <TouchableWithoutFeedback onPress={()=>setPageType('signup')}> 
          <Text style={styles.bottomText}>{'Don\'t have an acount? '} <Text style={{fontWeight:'bold'}}>Create now</Text></Text>
        </TouchableWithoutFeedback>}
    </View>
  );
};
const mapStateToProps= props=>{
  return{
    userDetails:props.user.userDetails,
    isLoggedIn:props.auth.isLoggedIn,
  };
}
export default connect(mapStateToProps, {setToast, register,login})(Auth);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  h1: {
    color: 'gray',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: '4%',
    marginTop: -60,
    // elevation:10,
  },
  caption: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 20,
    width: '90%',
    paddingLeft: '2%',
  },
  textInput: {
    backgroundColor: COLORS.white,
    width: '90%',
    marginBottom: '4%',
    fontSize: 16,
    paddingLeft: '4%',
    elevation: 2,
    color:COLORS.dark
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
    color: 'gray',
    fontSize: 19,
    // fontWeight:'bold'
  },
  bottomText:{
    marginTop:'4%',
    fontSize:16,
    color:'gray'
  }
});
