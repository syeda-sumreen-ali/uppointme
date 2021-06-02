import React, {useState, useEffect} from 'react'
import {NavigationContainer, useNavigation} from '@react-navigation/native'
import { navigate, navigationRef, isReadyRef }from './RootNavigation'
import {createStackNavigator} from '@react-navigation/stack'
import {
  View,
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import {connect} from 'react-redux'
import {clearToast, logout} from '../store/actions'
import {
  Home,
  Contact,
  Detail,
  NotificationDetails,
  Settings,
  Profile,
  Auth,
  Splash,
} from '../screens'
import {COLORS, ICONS} from '../constants'
import {styles} from './styles'
import {Toast} from '../component/Toast'
import messaging from '@react-native-firebase/messaging'

const Stack = createStackNavigator()

function MainStackNavigator (props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(true)
const [initialRoute, setInitialRoute] = useState('Splash')
  // const navigation = useNavigation()
  console.log(props)
  
  useEffect(async () => {
    messaging() 
    .onNotificationOpenedApp( remoteMessage => {
      setLoading(false)
      console.log(
        'Notification caused app to open from background state',
        remoteMessage,
      )
      console.log('remoteMessage.data.type', remoteMessage.data.type)
      // const navigation = props.navigation;
      isReadyRef.current = false;
      if(remoteMessage.data.type){

        navigationRef.current.navigate(remoteMessage.data.type, {
          screen:remoteMessage.data.type,
          params: { data:remoteMessage.data.type}
        })
        setInitialRoute(remoteMessage.data.type())
      }
      // setInitialRoute(remoteMessage.data.type,()=>navigation.navigate(remoteMessage.data.type))
      
    })

     messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          )
        }
        setLoading(false)
      })
    
      

    return () => {
      isReadyRef.current = false
    }
  }, [initialRoute])
  

  return (
    loading?<ActivityIndicator loading={true} size={32} color={COLORS.primary}/>:
  <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true
      }}>
      {props.isToastShowing && (
        <Toast
          {...props.toastConfig}
          isToastShowing={props.isToastShowing}
          clearToast={() => props.clearToast()}
        />
      )}
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <ICONS.Ionicons
              // onPress={() => alert("This is a button!")}
              name='settings'
              size={38}
              color='#2d15a3'
              style={{margin: 5, marginRight: 10}}
            />
          ),
          headerLeft: () => (
            <ICONS.Ionicons
              // onPress={() => alert("This is a button!")}
              name='help-circle'
              size={44}
              color='#2d15a3'
              style={{marginLeft: 10}}
            />
          ),
          headerTitleAlign: 'center',
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
          },
          headerTintColor: '#ffd700',
          headerBackTitleVisible: false,
        }}
        initialRouteName={initialRoute}
        headerMode='float'>
        <Stack.Screen
          name='Auth'
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='NotificationDetails'
          component={NotificationDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Splash'
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='Home'
          component={Home}
          // options={{
          //   title: "Phrase Map",
          // }}
          options={({navigation}) => ({
            headerRight: () => (
              <View style={styles.centeredView}>
                <Modal
                  animationType='slide'
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible)
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <TouchableOpacity style={styles.square}
                      onPress={()=>{
                        setModalVisible(false)
                        navigation.navigate('Contact')}}
                      >
                        <View>
                          <Text style={styles.buttonText}>Favourites</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.square}
                        onPress={() =>{
                          setModalVisible(false)
                          navigation.navigate('Profile')}}>
                        <View>
                          <Text style={styles.buttonText}>Profile</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.square}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Back</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.square}
                        onPress={() =>{
                          setModalVisible(false);
                          props.logout()}}>
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
                    name='settings'
                    size={38}
                    color='#FFD600'
                    style={{marginRight: 10}}
                  />
                </Pressable>
              </View>
            ),
            headerLeft: () => (
              <ICONS.Ionicons
                // onPress={() => alert("This is a button!")}
                name='help-circle'
                size={44}
                color='#FFD600'
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
          name='Detail'
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
                  animationType='slide'
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.')
                    setModalVisible(!modalVisible)
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <TouchableOpacity 
                      onPress={()=>{
                        setModalVisible(false);
                        navigation.navigate('Contact');
                      }}
                      style={styles.square}>
                        <View>
                          <Text style={styles.buttonText}>Favourites</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                       onPress={()=>{
                        setModalVisible(false)
                        navigation.navigate('Profile')
                      }}
                      style={styles.square}>
                        <View>
                          <Text style={styles.buttonText}>Profile</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(false)
                          props.logout}}
                        style={styles.square}>
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
                    name='settings'
                    size={38}
                    color='#FFD600'
                    style={{marginRight: 10}}
                  />
                </Pressable>
              </View>
            ),
            headerLeft: () => (
              <ICONS.Ionicons
                // onPress={() => alert("This is a button!")}
                name='help-circle'
                size={44}
                color='#FFD600'
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
          name='Settings'
          component={Settings}
          options={{title: 'Settings'}}
        />
        <Stack.Screen
          name='Contact'
          component={Contact}
          options={({navigation}) => ({
            title: 'Contacts',
            headerRight: () => (
              <View style={styles.centeredView}>
                <Modal
                  animationType='slide'
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible)
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
                          <Text style={styles.buttonText}>Profile</Text>
                        </View>
                      </TouchableOpacity>
                      <Pressable
                        style={styles.square}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Back</Text>
                      </Pressable>
                      <Pressable
                        style={styles.square}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Logout</Text>
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
                    name='settings'
                    size={38}
                    color='#FFD600'
                    style={{marginRight: 10}}
                  />
                </Pressable>
              </View>
            ),
            headerLeft: () => (
              <ICONS.Ionicons
                // onPress={() => alert("This is a button!")}
                name='help-circle'
                size={44}
                color='#FFD600'
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
  )
}

const mapStateToProps = props => {
  const {user, toast} = props
  return {
    // user:auth.user,
    // isUserExist:auth.isUserExist,
    // isLoading:auth.isLoading,
    // isFetchingUser:auth.isFetchingUser,
    user: user.userDetails,
    isToastShowing: toast.isToastShowing,
    toastConfig: toast.config,
  }
}

export default connect(mapStateToProps, {clearToast, logout})(
  MainStackNavigator,
)
