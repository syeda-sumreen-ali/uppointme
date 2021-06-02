import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import  Map from '../component/Map'
import { FONTS,COLORS } from '../constants'
import { navigationRef } from '../navigation/RootNavigation'


const NotificationDetails = (props) => {
    let data = props.route.params.data.data
 
    let where = JSON.parse(data.where)

    console.log("where===========",where)
    return (
        <View style={styles.container}>
            <Text style={styles.titile}>Notification Details</Text>
            <Text style={styles.h1}>Sender: <Text style={styles.val}>{data.sender}</Text></Text>
            <Text style={styles.h1}>Task: <Text style={styles.val}>{data.how}</Text></Text>
            <Text style={[styles.h1,styles.buttonText.mb20]}>Where:<Text style={styles.val}>{where.name}</Text></Text>
            <View style={{paddingTop:40}}>
            <Map location={where.location}/>

            </View>
            <TouchableOpacity style={styles.button} onPress={()=>navigationRef.current.navigate('Home')}>
                <Text style={styles.buttonText}>Go Home</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NotificationDetails

const styles = StyleSheet.create({
    titile:{
        ...FONTS.title_b,
        color:'black',
        fontWeight:'bold',
        marginBottom:25
    },
    h1:{
        ...FONTS.h1_b,
        color:'black',
        fontWeight:'bold',
        marginBottom:10
    },
    val:{
        ...FONTS.h1_r,
        color:'black',
        paddingLeft:30,
        fontWeight:'100'
    },
    button: {
        backgroundColor: COLORS.primary,
        // elevation: 10,
        borderWidth:4,
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '90%',
        // position:'absolute',
        // bottom:0,
        marginBottom: '6%',
        alignSelf:'center'
      },
      buttonText: {
        color: COLORS.dark,
        fontSize: 19,
        textTransform:'uppercase',
        fontWeight:'bold'
      },
      container:{
          backgroundColor:'white',
          padding:'5%',
          flex:1
      },
      mb20:{paddingBottom:20}
})
