import React,{useEffect} from 'react'
import { StyleSheet,Image, Text, View } from 'react-native'
import {COLORS, FONTS} from '../constants'
import splashImg from '../assets/logo.png'
import {connect} from 'react-redux'
import {getUserDetails, logout} from '../store/actions'
import {getAppStorage} from '../utils/localstorage'
import * as Animatable from 'react-native-animatable';

const Splash = (props) => {

  const  navigateToProfileOrHome=(page)=>{
      console.log("Object.keys(props.user).length===0",
      Object.keys(props.user).length===0, props.user)
        setTimeout(() => {
            console.log(page)
            props.navigation.replace(page)
        }, 5000);
    }
    useEffect(async() => {

        let user = await getAppStorage('auth')
        console.log("AAAAAAAAAAAAaaaaaaaaaaaaaaaaaa", user)
        if(!user){
            setTimeout(() => {
                props.navigation.replace('Auth')
            }, 5000);
        }else{
            await props.getUserDetails((page)=>navigateToProfileOrHome(page))
        }
    }, [])
    return (
        <Animatable.View
				animation={"fadeIn"}
				iterationCount={1}
				//when the first animation end and the toast visible then after 3 secs 
				// change the animation to exist animation
				>

        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={splashImg}/>
                <Text style={styles.logoText}>UPOINT.ME</Text> 
            </View>      
            <Text style={styles.caption}>Get there Safely</Text>
        </View>
                </Animatable.View>
    )
}

const mapStateToProps= props=>{
    return{
        user:props.user,
        isLoggedIn:props.auth.isLoggedIn
    }
}
export default connect(mapStateToProps,{getUserDetails})(Splash)

const styles = StyleSheet.create({
    container:{
        backgroundColor:COLORS.white,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
   
    img:{
        width:250,
        height:250,
        transform: [{rotate: '135deg'}],
    },
    imgContainer:{
        transform: [{rotate: '45deg'}],
        // marginLeft:-25
        // overflow:'hidden'
    },
    logoText:{
        textTransform:'uppercase',
        fontWeight:'bold',
        fontSize:25,
        alignSelf:'center',
        textAlign:'center',
        marginTop:-30,
        // textAlign:'justify',
        letterSpacing:1
    },
    caption:{
        textTransform:'uppercase',
        fontSize:22,
        fontStyle:'italic',
        color:'gray',
        fontWeight:'bold',
        letterSpacing:1.5,
       paddingTop:80
    },
    footer:{
        fontSize:16,
        fontWeight:"bold",
        position:'absolute',
        bottom:10
    }
})
