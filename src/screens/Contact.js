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
  updateFavourite,
  // getFavourites,
  setPushNotificationData,
} from '../store/actions'
import {COLORS, ICONS} from '../constants'
import AddNewLocation from './AddNewLocation'
import { TouchableHighlight } from 'react-native'

const windowWidth = Dimensions.get('window').width

const Contact = props => {
  const [List, setList] = React.useState([])
  const [showModal, setShowModal] = useState(false)
const [activeTab, setactiveTab] = useState('contact')
  const {
    getAllContacts,
    updateFavourite,
    contactList,
    userDetails,
    isContactLoading,
  } = props

  const getFavourites =()=>{
    const {contactList, userDetails} = props;
    let favUserArr = []
    userDetails.favourites.map((item,index)=>{
     for (let index2= 0; index2 < contactList.length; index2++) {
          if(contactList[index2].id===item){
            favUserArr.push(contactList[index2])
          }    
     }
    })
    console.log("favUserArr==============",favUserArr)
   
    setList(favUserArr)
  }

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
          if (item.id === item2 ) {
            item.liked = true
          }
        })
      })
      console.log(arr)
      setList(arr)
    }
    else {
      await getAllContacts(()=>getFavourites())
    }
    if(activeTab ==='location'){
      
      setList(props.userDetails.locations)
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
  }, [props.contactList.length, activeTab])

  const onChangeFavourite = (item,index) => {
    //if item is in favourites remove it from list else add it

    let arr = List.slice(0)
    let favourites = props.userDetails.favourites || []
    let type = ''
  
        if(favourites.length){
          if(favourites.find((fav_item,fav_index)=>fav_item===item.id)){
                favourites = favourites.filter(item2=> item2 !== item.id)
                arr[index].liked = !arr[index].liked
          }
         
          else{
                console.log("user not exist that's why added")
                favourites.push(item.id) 
                arr[index].liked = !arr[index].liked
              }
          
        }else{
          console.log("empty favourties  that's why added")
          arr[index].liked = !arr[index].liked
          favourites.push(item.id) 
        }

      console.log(favourites)
  
    updateFavourite(favourites, type)
    setList([...arr, props.userDetails.locations])
  }

  const ItemView = ({item, index}) => {
    return (
      <View style={{marginTop: '5%'}}>
        <TouchableOpacity
          activeOpacity={0.7}
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
        <ActivityIndicator size={100} color={COLORS.primary} />
      ) : 
      showModal?
      <AddNewLocation 
        navigation={(page)=> props.navigation.navigate(page)}
        closeModal={()=>setShowModal(false)}/>
      :
      
      (
        <View>
       <View style={styles.tabcontainer} >
       <TouchableHighlight onPress={()=>setactiveTab('contact')}>
          <Text style={activeTab==='contact'?styles.activeLink:styles.inActiveLink}>Contacts</Text>
       </TouchableHighlight>
       <TouchableHighlight onPress={()=>setactiveTab('location')}>
          <Text style={activeTab==='location'?styles.activeLink:styles.inActiveLink}>Locations</Text>
       </TouchableHighlight>
         </View>
     
       { props.route.params === undefined && activeTab==='location' && addNewLocationButton()}
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
  updateFavourite,
  // getFavourites,
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
  },
  inActiveLink: {
    color: COLORS.white,
    fontSize: 20,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginBottom: '4%',
    
    padding: '5%',
  },
  activeLink:{
    color: COLORS.primary,
    fontSize: 20,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginBottom: '4%',
    padding: '5%',
  },
  tabcontainer:{
    flexDirection:"row",
    backgroundColor:'black',
    // alignItems:'center',
    justifyContent:'center'


  }
})
