import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {connect} from 'react-redux'
import {sendPushNotification} from '../store/actions'


const Home = (props) => {
  const { navigation } = props;
 
  return (
    <ScrollView>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.square}
        onPress={() => navigation.navigate("Detail")}
      >
        <View>
       
          <Text
            adjustsFontSizeToFit={true}
            minimumFontScale={0.1}
            style={styles.buttonText}
          >
            How
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.square}
        onPress={() => navigation.navigate("Contact",{from:"contact"})}
      >
        <View>
          <Text
            adjustsFontSizeToFit={true}
            minimumFontScale={0.1}
            style={styles.buttonText}
          >
            Who
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.square}
        onPress={() => navigation.navigate("Contact")}
      >
        <View>
          <Text
            adjustsFontSizeToFit={true}
            minimumFontScale={0.1}
            style={styles.buttonText}
          >
            Where
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
      style={styles.square}
      onPress={()=>{
        // console.log(props.pushNotificationData, props.token);
        props.sendPushNotification(props.pushNotificationData, props.token )}}
      >
        <Text  style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const mapStateToProps = props =>{
  // console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",props)
  return{
    pushNotificationData: props.pushNotification,
    token: props.user.userDetails.token
  }

}

export default connect(mapStateToProps, {sendPushNotification})(Home);

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
    alignSelf: "center",
    transform: [{ rotate: "-45deg" }],
  },
  square: {
    width: 130,
    height: 130,
    backgroundColor: "#FFD600",
    padding: 2,
    margin: 30,
    justifyContent: "center",
    transform: [{ rotate: "45deg" }],
    borderColor: "black",
    borderWidth: 4,
  },
});


