import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native'
import {COLORS, ICONS} from '../constants'
import {connect} from 'react-redux'
import {handleFavourite} from '../store/actions'
import Map from '../component/Map'
import {TouchableOpacity} from 'react-native-gesture-handler'
import { navigationRef } from '../navigation/RootNavigation'

const AddNewLocation = props => {
  const [userName, setUserName] = useState('')
  const [location, setLocation] = useState('')


  const handleSubmit = () => {
      let obj={name: userName, location: location}
      let arr = props.favorite.slice(0)
      arr.push(obj)
        console.log(arr)
        props.handleFavourite(arr, 'add')
    // props.onChangeFavourite(obj)
  }
  console.log(props,"================================")
  return (

    <View style={styles.container}>
      <View style={{flexDirection:'row', width:'100%'}}>
      
          <View
            style={{flex: 0.18, justifyContent: 'center', paddingLeft: '5%'}}>
            <TouchableOpacity onPress={() => props.navigation('Home')}>
              <ICONS.AntDesign name={'left'} size={28} color={COLORS.dark} />
            </TouchableOpacity>
          </View>

        <View style={{flex: 1}}>
          <Text style={styles.h1}> Add New Favorite </Text>
        </View>
      </View>
     

     
      <Text style={styles.h2}>Username:</Text>
      <TextInput
        placeholderTextColor={'gray'}
        style={styles.textInput}
        placeholder={'Enter Name'}
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
        onPress={userName && location ? handleSubmit : () => {}}
        style={[
          styles.button,
          !(userName && location) && {backgroundColor: COLORS.disabled},
        ]}>
        <Text style={styles.buttonText}>{'Save'}</Text>
      </TouchableHighlight>
      </View>
   
  )
}


export default connect(null,{handleFavourite})(AddNewLocation)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    // flexDirection:'row',
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
    alignSelf: 'flex-start',
    // textAlign:'left',
    fontWeight: '600',
    marginBottom: '4%',
    paddingLeft: '5%',
    // marginTop: -60,
    // elevation:10,
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
    marginBottom: '6%',
  },
  buttonText: {
    color: COLORS.dark,
    fontSize: 19,
    // fontWeight:'bold'
  },
})
