import React,{useState} from 'react'
import {
  StyleSheet,
  FlatList,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
} from 'react-native'
import {connect} from 'react-redux'
import {
  getUserDetails,
  getAllContacts,
  handleFavourite,
  setPushNotificationData,
} from '../store/actions'
import {COLORS, ICONS} from '../constants'
import AddNewLocation from './AddNewLocation'

const windowWidth = Dimensions.get('window').width

const Contact = props => {
  const [List, setList] = React.useState([])
  const [showModal, setShowModal] = useState(false)

  const {
    getAllContacts,
    handleFavourite,
    contactList,
    userDetails,
    isContactLoading,
  } = props

  React.useEffect(async () => {
    if (props.route.params === undefined) {
      setList(userDetails.favourites)
    }
    if (
      props.route.params !== undefined &&
      props.route.params.from === 'contact'
    ) {
      await getAllContacts(() => setList(contactList))
      let myfavourites = props.userDetails.favourites
      let arr = props.contactList
      arr.map(item => {
        myfavourites.map(item2 => {
          if (item.id === item2.id || item.name === item2.name) {
            item.liked = true
          }
        })
      })
      console.log(arr)
      setList(arr)
    }

    const backAction = () => {
      props.navigation.navigate('Home')
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove()
  }, [props.contactList.length])

  const onChangeFavourite = (item, index) => {
    //if item is in favourites remove it from list else add it

    let arr = List.slice(0)
    let favorite = props.userDetails.favourites || []
    let type = ''
    if(index){
      
      arr[index].liked = !arr[index].liked
  
      if (arr[index].liked) {
        favorite.push(item)
        type = 'add'
      } else {
        favorite = favorite.filter(item2 => item2.id !== item.id)
        type = 'remove'
      }
    }
    else{
      favorite.push(item)
      type='add'
      console.log("item===========================",item,index)
    }

    let modified_arr = []
    favorite.map(item => {
      modified_arr.push({name: item.name, location: item.location})
    })
    handleFavourite(modified_arr, type)
    setList(arr)
  }

  const ItemView = ({item, index}) => {
    return (
      <View style={{marginTop: '5%'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          // underlayColor={COLORS.light}/
          style={styles.square}
          onPress={() => {
            props.setPushNotificationData(
              item,
              props.route.params !== undefined &&
                props.route.params.from === 'contact'
                ? 'who'
                : 'where',
            )
            props.navigation.navigate('Home')
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: '6%',
            }}>
            <Text
              adjustsFontSizeToFit={true}
              minimumFontScale={0.1}
              style={styles.buttonText}>
              {item.name}
            </Text>
            {props.route.params !== undefined &&
              props.route.params.from === 'contact' && (
                <TouchableOpacity
                  onPress={() => onChangeFavourite(item, index)}>
                  <ICONS.MaterialIcons
                    name={item.liked ? 'favorite' : 'favorite-outline'}
                    size={30}
                    color={COLORS.dark}
                  />
                </TouchableOpacity>
              )}
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const addNewLocationButton=()=>(
    <TouchableOpacity
    onPress={()=>{
      setShowModal(true)
      props.navigation.setOptions({headerShown: false});
    }}
    style={styles.addBtn}>
      <Text style={styles.addBtnText}> + New Location</Text>
    </TouchableOpacity>
  )
  return (
    <View style={styles.container}>

      {isContactLoading ? (
        <ActivityIndicator size={40} color={COLORS.primary} />
      ) : 
      showModal?
      <AddNewLocation 
      navigation={(page)=> props.navigation.navigate(page)}
      favorite={props.userDetails.favourites}
      onChangeFavourite={()=>onChangeFavourite()}
       closeModal={()=>setShowModal(false)}/>
      :
      
      (
        <View>
       { props.route.params === undefined&& addNewLocationButton()}
        <FlatList
          data={List}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
        </View>
      )}
    </View>
  )
}

const mapStateToProps = props => {
  const {user} = props
  return {
    contactList: user.contactList,
    isContactLoading: user.isContactLoading,
    userDetails: user.userDetails,
  }
}

export default connect(mapStateToProps, {
  getAllContacts,
  getUserDetails,
  handleFavourite,
  setPushNotificationData,
})(Contact)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
  },
  square: {
    width: windowWidth * 0.8,
    height: 60,
    backgroundColor: '#FFD600',
    padding: 2,
    margin: 5,

    justifyContent: 'center',
    //transform: [{ rotate: "45deg" }],
    borderColor: 'black',
    borderWidth: 4,
  },

  addBtn:{
    backgroundColor:'black',
    marginVertical:'5%',
    height:50,
    marginLeft:'1%',
    width: windowWidth * 0.8,
    paddingLeft:15,
    // alignItems:'center',
    justifyContent:'center'
  },
  addBtnText:{
      color:'white',
      fontSize:18
  }
})
