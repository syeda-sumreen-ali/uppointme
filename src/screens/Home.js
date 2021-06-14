import React from 'react'
import {StyleSheet, View, Text,SafeAreaView, TouchableOpacity} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import {sendPushNotification} from '../store/actions'

const Home = props => {
  const {navigation} = props

  React.useEffect(() => {
   
  }, [props.pushNotificationData])
  const ReactangleCard = (value, onPress) => (
    <TouchableOpacity
      style={styles.rectangle}
      onPress={()=>onPress()}>
      <Text style={styles.rectangleText}>{value}</Text>
    </TouchableOpacity>
  )

  const SquareCard = (name,onPress) => (
    <TouchableOpacity
      style={styles.square}
     onPress={()=>onPress()}
     >
      <View>
        <Text
          adjustsFontSizeToFit={true}
          minimumFontScale={0.1}
          style={styles.buttonText}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  )
  console.log(props.pushNotificationData.how)
  return (
    // <SafeAreaView>

  
    <ScrollView style={{flex:1}}>
      <View style={styles.container}>
        {props.pushNotificationData.how
          ? ReactangleCard(props.pushNotificationData.how,()=> navigation.navigate('Detail'))
          : SquareCard('How', ()=>navigation.navigate('Detail'))}

            {props.pushNotificationData.who.name
          ? ReactangleCard(props.pushNotificationData.who.name,()=> navigation.navigate('Contact',{from:'contact'}))
          : SquareCard('Who',()=> navigation.navigate('Contact',{from:'contact'}))}
      


      {props.pushNotificationData.how ==='goto' ? null:(props.pushNotificationData.where.name
          ? ReactangleCard(props.pushNotificationData.where.name,()=> navigation.navigate('Contact'))
          : SquareCard('Where',()=> navigation.navigate('Contact')))}
      


        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            props.sendPushNotification(props.pushNotificationData, props.token)
          }}>
          <Text style={styles.SubmitBtntext}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    // </SafeAreaView>
  )
}

const mapStateToProps = props => {
  console.log(props.pushNotification)
  return {
    pushNotificationData: props.pushNotification,
    token: props.user.userDetails.token,
  }
}

export default connect(mapStateToProps, {sendPushNotification})(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight:680,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform:'uppercase'
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    fontSize:34,
    fontWeight:'bold',
    color: 'black',
    alignSelf: 'center',
    transform: [{rotate: '-45deg'}],
  },
  square: {
    width: 130,
    height: 130,
    backgroundColor: '#FFD600',
    padding: 2,
    margin: 30,
    justifyContent: 'center',
    transform: [{rotate: '45deg'}],
    borderColor: 'black',
    borderWidth: 4,
    marginTop:50
  },
  rectangle: {
    backgroundColor: '#42f560',
    borderWidth: 4,
    borderColor: 'black',
    width: '60%',
    minHeight: 60,
    maxHeight:'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:70
  },
  rectangleText:{
    fontSize:32,
    fontWeight:'bold',
    textTransform:'uppercase'
  },
  submitBtn:{
    marginVertical:50,
    backgroundColor: '#FFD600',
    borderWidth: 4,
    borderColor: 'black',
    width: '60%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubmitBtntext:{
    fontSize:32,
    fontWeight:'bold',
    textTransform:'uppercase'
  }

})
