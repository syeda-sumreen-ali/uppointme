import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import {connect} from 'react-redux'
import {setPushNotificationData} from '../store/actions'

const Detail = (props) => {
  const { navigation } = props;
  let arr = ['send', 'bring', 'goto', 'find', 'search','follow']

  return (
    <View style={styles.container}>
      <View style={{ margin: 10 }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "black",
            // alignSelf: "center",
            marginBottom: 25,
            textAlign: "center",
          }}
        >
          Tap the Action You Wish To Perform
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>

       {arr.map(((item,index)=>(

        <TouchableOpacity
        key={index} 
          style={styles.square}
          onPress={() => {
            if(item==='goto' || item ==='bring' || item ==='send'){

              props.setPushNotificationData(item, 'how')
              props.navigation.navigate('Home')
            }else {

            }
       } }
        >
          <View>
            <Text style={styles.buttonText}>{item}</Text>
          </View>
        </TouchableOpacity>
       )
      ))}
      </View>
    </View>
 
  );
};



export default connect(null, {setPushNotificationData})(Detail);
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
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textTransform:'capitalize',
    alignSelf: "center",
    //transform: [{ rotate: "-45deg" }],
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

