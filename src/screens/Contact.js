import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import { SearchBar } from "react-native-elements";
import {connect} from 'react-redux';
import {getAllContacts,  handleFavourite}from '../store/actions'
import {COLORS, ICONS} from '../constants'
import { getAppStorage } from "../utils/localstorage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Contact=(props)=> {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [contacts, setContacts] = useState([]);

  const getContacts=async()=>{
    if(props.contactList){
     setFilteredDataSource(props.contactList)
    }

  }
  useEffect((async () => {
     await props.getAllContacts(()=>getContacts()) 

    let arr = props.contactList
    let myfavourites = props.userDetails.favourites||[]
    console.log("myfavourites",myfavourites)
    arr.map((item)=>{
      myfavourites.map(item2=>{
        if(item.id ===item2.id){
          item.liked=true
          console.log('I like you ')
        }else{
          item.liked=false
          console.log('I don\'t like you')
        }
      })
    })

    console.log(arr)

    if(search.length === 0){
       setMasterDataSource(arr)
     }

     console.log(props.contactList)
    }),[props.contactList.length]);

  const searchFilterFunction = (text) => {
    if (text) {    
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleFavourite = (item)=>{
    // console.log("hndleFavourite",item.favourites)
    console.log(props.userDetails)
    let favourites= props.userDetails.favourites||[]
    let type= 'add'
    if(!favourites.length){
      favourites.push(item)
    }else{
      favourites.map((person,index)=>{
        if(person.id===item.id){
          favourites= favourites.splice(index,0)
          type ='remove'
          // console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",favourites)
        }else{
          favourites.push(item)
        }
      })
    }
    props.handleFavourite(favourites,type)
    // console.log("favourites",favourites)
    

  }
  const ItemView = ({ item }) => {
    return (
      <View style={{marginTop:'5%'}}>
        <TouchableHighlight
          style={styles.square}
          onPress={() => getItem(item)}
          //onPress={() => navigation.navigate("Home")}
        >
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:'6%'}}> 
            <Text
              adjustsFontSizeToFit={true}
              minimumFontScale={0.1}
              style={styles.buttonText}
            >{item.name}</Text>
            <TouchableOpacity onPress={()=>handleFavourite(item)}>
              <ICONS.MaterialIcons name={item.liked?'favorite':'favorite-outline'} size={30} color={COLORS.dark}/>
            </TouchableOpacity>
        
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    // alert("Id : " + item.id + " Title : " + item.name);
    alert(
      // "Name: " + item.name + `\n` + "Number : " + item.phoneNumbers[0].number
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <SearchBar
          containerStyle={{ backgroundColor: "black" }}
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Search Contact"
          value={search}
        />
      </View>

      {props.isContactLoading?

      <View style={styles.container}>
        <View>
          <ActivityIndicator color={COLORS.primary} size={35}/>
        </View>
      </View>
      :<View style={styles.container}>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      </View>}
    </SafeAreaView>
  );
}
const mapStateToProps = props => {
  const {user}=props
  return{
    isContactLoading:user.isContactLoading,
    contactList:user.contactList,
    userDetails:user.userDetails
  }
}

export default connect(mapStateToProps, {getAllContacts, handleFavourite})(Contact)

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
