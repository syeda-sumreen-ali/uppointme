import React from 'react'
import { StyleSheet,FlatList,TouchableHighlight, Dimensions, TouchableOpacity,  ActivityIndicator, Text, View } from 'react-native'
import {connect} from 'react-redux'
import { getUserDetails, getAllContacts,  handleFavourite , setPushNotificationData } from "../store/actions";
import {COLORS, ICONS} from '../constants'


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const Contact = (props) => {
  
  const [List, setList] = React.useState([])
  const {getAllContacts, getUserDetails, handleFavourite, contactList, userDetails, isContactLoading} = props
  
  console.log("props.route.params",props.route.params)
  React.useEffect(async () => {

   if(props.route.params === undefined){
    setList(userDetails.favourites)
   } 
  if(props.route.params!==undefined && props.route.params.from==='contact'){
      await getAllContacts(()=>setList(contactList))
      let myfavourites = props.userDetails.favourites||[]    
      let arr = props.contactList
      arr.map((item)=>{
        myfavourites.map(item2=>{
          if(item.id ===item2.id){
            item.liked=true
          }
        })
      })    
        setList(arr)
    }
  }, [props.contactList.length, props.userDetails.favourites.length])
  

  const onChangeFavourite = (item)=>{

    //if item is in favourites remove it from list else add it

    let favorite = props.userDetails.favourites||[]
    let type= 'add'
    
    if(!favorite.length){
      favorite.push(item)
    }
    else{  
      let before = favorite.length
      
      favorite = favorite.filter(item2 => item2.id !== item.id)
      
      if(favorite.length !== before){
        type ='remove'
        before = favorite.length
      }else{
        type ='add'
        favorite.push(item)
        before = favorite.length
      }

    //  console.log("favorite",favorite) 
    handleFavourite(favorite,type)
    }
  
  }

  const ItemView = ({item}) =>{
    
    return (
      <View style={{marginTop:'5%'}}>
        <TouchableHighlight
          style={styles.square}
          onPress={() => {
            props.setPushNotificationData(item,props.route.params!==undefined&& props.route.params.from === 'contact'?'who':'where' ) 
            props.navigation.navigate("Home")
          }
          }
        >
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:'6%'}}> 
            <Text
              adjustsFontSizeToFit={true}
              minimumFontScale={0.1}
              style={styles.buttonText}
            >{item.name}</Text>
            {(props.route.params!==undefined&& props.route.params.from === 'contact')&&<TouchableOpacity onPress={()=>onChangeFavourite(item)}>
              <ICONS.MaterialIcons name={item.liked?'favorite':'favorite-outline'} size={30} color={COLORS.dark}/>
            </TouchableOpacity>}
        
          </View>
        </TouchableHighlight>
      </View>
      )
    }
    
    // console.log("zzzzzzzzzzzzzzzz",List)
  return (
   
      <View style={styles.container}>
      {/* {isContactLoading?  <ActivityIndicator size={40} color={COLORS.primary}/>: */}
        <FlatList
          data={List}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      {/* } */}
      </View> 
  )

}

const mapStateToProps = props => {
  const {user} = props
  return{
    contactList : user.contactList,
    isContactLoading : user.isContactLoading,
    userDetails : user.userDetails
  }
}



export default connect(mapStateToProps,{getAllContacts,getUserDetails,handleFavourite, setPushNotificationData})(Contact)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#222",
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    fontSize : 20 ,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    textAlign: "center",
  },
  square: {
    width: windowWidth * 0.8,
    height: 60,
    backgroundColor: "#FFD600",
    padding: 2,
    margin: 5,

    justifyContent: "center",
    //transform: [{ rotate: "45deg" }],
    borderColor: "black",
    borderWidth: 4,
  },
});
