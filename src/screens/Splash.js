import React,{useEffect} from 'react'
import { StyleSheet,Image, Text, View } from 'react-native'
import {COLORS, FONTS} from '../constants'
import splashImg from '../assets/splash4.png'
import {connect} from 'react-redux'
import {getUserDetails} from '../store/actions'
import {getAppStorage} from '../utils/localstorage'
import * as Animatable from 'react-native-animatable';

const Splash = (props) => {

  const  navigateToProfileOrHome=(page)=>{
      console.log("Object.keys(props.user).length===0",Object.keys(props.user).length===0, props.user)
        setTimeout(() => {
            console.log(page)
            props.navigation.replace(page)
        }, 5000);
    }
    useEffect(async() => {

        let user = await getAppStorage('auth')
        if(!user){
            setTimeout(() => {
                props.navigation.replace('Auth')
            }, 5000);
        }else{
            await props.getUserDetails((page)=>navigateToProfileOrHome(page))
        }
    }, [])
    // console.log(props)
    return (
        <Animatable.View
				animation={"fadeIn"}
				iterationCount={1}
				//when the first animation end and the toast visible then after 3 secs 
				// change the animation to exist animation
				>

        <View style={styles.container}>
            <Image source={splashImg} style={styles.img}/>
            <View style={styles.titleContainer}>
                <Text style={[styles.title,{paddingBottom:40}]}>Uppiont</Text>
                <Text style={[styles.title,{paddingTop:30}]}>Me</Text>
            </View>
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
        backgroundColor:COLORS.primary,
        // flex:1,
        // justifyContent:'center',
        // alignItems:'center'
    },
    titleContainer:{
        backgroundColor:COLORS.primary,
        top:10,
        right:10,
        width:'40%',
        height:'13%',
        // textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        elevation:30,
        zIndex:30,
        position:'absolute',
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        // ...FONTS.title_b,
        fontWeight:'bold',
        position:'absolute',

        fontSize:30,
      
        color:COLORS.white
    },
    img:{
        width:'100%',
        height:'100%',
      
    }
})
