import React from 'react'
import  MainStackNavigator from './src/navigation/MainStackNavigator'
import{ NavigationContainer} from '@react-navigation/native'
import {store} from './src/store/store'
import {Provider} from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      {/* <NavigationContainer> */}
        <MainStackNavigator/>
      {/* </NavigationContainer> */}
    </Provider>
  )
}

export default App
