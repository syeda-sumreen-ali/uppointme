import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  View,
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux'
import { clearToast, logout} from '../store/actions' 
import {Home, Contact, Detail,  Settings,Profile, Auth, Splash} from '../screens'
import {COLORS, ICONS} from '../constants';
import {isReadyRef, navigationRef} from './RootNavigation'
import {styles} from './styles'
import {Toast} from '../component/Toast'
import messaging from '@react-native-firebase/messaging'


const Stack = createStackNavigator();

function MainStackNavigator(props) {
  const [modalVisible, setModalVisible] = useState(false);
const [loading, setLoading] = useState(true);
const [inititalRoute, setInititalRoute] = useState('Splash')
  useEffect(async() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state',
      remoteMessage.notification)
      navigation.navigate(remoteMessage.data.type);
    });

    (await messaging().getInitialNotification())
    .then(remoteMessage=>{
      if(remoteMessage){
        console.log('Notification caused app to open from quit state:',
        remoteMessage.notification)
        setInitialroute(remoteMessage.data.type)
      }
setLoading(false);
    })

    return () => { isReadyRef.current = false };   

  }, [])

  return (
 
    loading? <ActivityIndicator loading={true} size={45} color={COLORS.primary}/> :
    <NavigationContainer 
    ref={navigationRef}
     onReady={()=>{
      isReadyRef.current=true
    }} >
       {props.isToastShowing &&
        <Toast 
          {...props.toastConfig} 
          isToastShowing={props.isToastShowing}
          clearToast={() => props.clearToast()}
        />}
     <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <ICONS.Ionicons
            // onPress={() => alert("This is a button!")}
            name="settings"
            size={38}
            color="#FFD600"
              style={{margin: 5, marginRight: 10}}
              />
              ),
          headerLeft: () => (
            <ICONS.Ionicons
            // onPress={() => alert("This is a button!")}
            name="help-circle"
            size={44}
            color="#FFD600"
            style={{marginLeft: 10}}
            />
            ),
            headerTitleAlign: 'center',
            gestureEnabled: true,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
            headerTintColor: '#ffd700',
            headerBackTitleVisible: false,
          }}
        initialRouteName={inititalRoute}
        headerMode="float">
    
          <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}}/>
          <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
         <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          // options={{
          //   title: "Phrase Map",
          // }}
          options={({navigation}) => ({
            headerRight: () => (
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <TouchableOpacity style={styles.square}>
                        <View>
                          <Text style={styles.buttonText}>Favourites</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.square} onPress={()=>navigation.navigate('Profile')}>
                        <View>
                          <Text style={styles.buttonText}>Profiles</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.square}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Back</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.square} onPress={()=>props.logout()}>
                        <View>
                          <Text style={styles.textStyle}>Logout</Text>
                        </View>
                      </TouchableOpacity>
                      {/* <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => (
                          navigation.navigate("Detail", { item: "character" }),
                          setModalVisible(!modalVisible)
                        )}
                      >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                      </Pressable> */}
                    </View>
                  </View>
                </Modal>
                <Pressable
                  //style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible(true)}>
                  <ICONS.Ionicons
                    // onPress={() => alert("This is a button!")}
                    name="settings"
                    size={38}
                    color="#FFD600"
                    style={{marginRight: 10}}
                  />
                </Pressable>
              </View>
            ),
            headerLeft: () => (
              <ICONS.Ionicons
                // onPress={() => alert("This is a button!")}
                name="help-circle"
                size={44}
                color="#FFD600"
                style={{marginLeft: 10}}
              />
            ),
            headerTitleAlign: 'center',
            gestureEnabled: true,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
            headerTintColor: '#ffd700',
            headerBackTitleVisible: false,
          })}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          // options={({ route }) => ({
          //   //title: route.params.item.name,
          //   title: "",
          // })}
          options={({navigation}) => ({
            title: 'Details',
            headerRight: () => (
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <TouchableOpacity style={styles.square}>
                        <View>
                          <Text style={styles.buttonText}>Favourites</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.square}>
                        <View>
                          <Text style={styles.buttonText}>Profiles</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>props.logout} style={styles.square}>
                        <View>
                          <Text style={styles.buttonText}>Logout</Text>
                        </View>
                      </TouchableOpacity>
                      <Pressable
                        style={styles.square}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Back</Text>
                      </Pressable>
                      {/* <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => (
                          navigation.navigate("Detail", { item: "character" }),
                          setModalVisible(!modalVisible)
                        )}
                      >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                      </Pressable> */}
                    </View>
                  </View>
                </Modal>
                <Pressable
                  //style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible(true)}>
                  <ICONS.Ionicons
                    onPress={() => alert('This is a button!')}
                    name="settings"
                    size={38}
                    color="#FFD600"
                    style={{marginRight: 10}}
                  />
                </Pressable>
              </View>
            ),
            headerLeft: () => (
              <ICONS.Ionicons
                // onPress={() => alert("This is a button!")}
                name="help-circle"
                size={44}
                color="#FFD600"
                style={{marginLeft: 10}}
              />
            ),
            headerTitleAlign: 'center',
            gestureEnabled: true,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
            headerTintColor: '#ffd700',
            headerBackTitleVisible: false,
          })}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Settings'}}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={({navigation}) => ({
            title: 'Contacts',
            headerRight: () => (
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);

                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <TouchableOpacity style={styles.square}>
                        <View>
                          <Text style={styles.buttonText}>Favourites</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.square}>
                        <View>
                          <Text style={styles.buttonText}>Profiles</Text>
                        </View>
                      </TouchableOpacity>
                      <Pressable
                        style={styles.square}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Back</Text>
                      </Pressable>
                      {/* <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => (
                          navigation.navigate("Detail", { item: "character" }),
                          setModalVisible(!modalVisible)
                        )}
                      >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                      </Pressable> */}
                    </View>
                  </View>
                </Modal>
                <Pressable
                  //style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible(true)}>
                  <ICONS.Ionicons
                    onPress={() => navigation.goBack()}
                    name="settings"
                    size={38}
                    color="#FFD600"
                    style={{marginRight: 10}}
                  />
                </Pressable>
              </View>
            ),
            headerLeft: () => (
              <ICONS.Ionicons
                // onPress={() => alert("This is a button!")}
                name="help-circle"
                size={44}
                color="#FFD600"
                style={{marginLeft: 10}}
              />
            ),
            headerTitleAlign: 'center',
            gestureEnabled: true,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
            headerTintColor: '#ffd700',
            headerBackTitleVisible: false,
          })}
        />
      </Stack.Navigator>
    
    
    </NavigationContainer>
  
  
  );
}



const mapStateToProps=props=>{
  const {user, toast}=props
  return{
    // user:auth.user,
    // isUserExist:auth.isUserExist,
    // isLoading:auth.isLoading,
    // isFetchingUser:auth.isFetchingUser,
    user:user.userDetails,
    isToastShowing: toast.isToastShowing,
    toastConfig: toast.config,
  }
}

export default connect (mapStateToProps, {clearToast, logout})(MainStackNavigator);